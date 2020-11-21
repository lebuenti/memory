import firebase from "./firebase";

const collectionSubjects = 'subjects';
const collectionsCardStacks = 'cardStacks';
const collectionCards = 'cards';

const db = {};

db.getCurrentUser = () =>
    new Promise((resolve => firebase.auth().onAuthStateChanged((user) => resolve(user))
    ));

db.login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

db.logout = () => firebase.auth().signOut();

db.createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

db.getSubjects = async () =>
    firebase.firestore().collection(collectionSubjects)
        .where('user', '==', (await db.getCurrentUser()).uid)
        .get();

db.getSubject = (subjectId) => firebase.firestore().collection(collectionSubjects)
    .doc(subjectId)
    .get();

db.getSubjectByCardStackId = async (cardStackId) =>
    (await db.getSubjects()).docs.find(doc => doc.data().cardStacks && doc.data().cardStacks.includes(cardStackId));

db.addSubject = async (color, name) =>
    firebase.firestore()
        .collection(collectionSubjects)
        .add({
            color: color,
            name: name,
            user: (await db.getCurrentUser()).uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

db.updateSubject = (subjectId, newName, newColor) => {
    let updates = {};
    if (newName) updates['name'] = newName;
    if (newColor) updates['color'] = newColor;
    return firebase.firestore().collection(collectionSubjects).doc(subjectId).update(updates);
}

db.deleteSubject = (subjectId) => firebase.firestore().collection(collectionSubjects).doc(subjectId).delete();

db.addCardStackToSubject = (subjectId, cardStackId) =>
    firebase.firestore()
        .collection(collectionSubjects)
        .doc(subjectId)
        .update({
            cardStacks: firebase.firestore.FieldValue.arrayUnion(cardStackId)
        });

db.getAllCardsFromCardStack = async (cardStackId) => {
    const cardStacks = await db.getCardStack(cardStackId);
    if (!cardStacks.data() || !cardStacks.data().cards) return {docs: []};
    return db.getCards(cardStacks.data().cards);
};

db.getCardStack = (cardStackId) =>
    firebase.firestore().collection(collectionsCardStacks)
        .doc(cardStackId)
        .get();

db.getCardStacks = (cardStacksIds) =>
    firebase.firestore().collection(collectionsCardStacks)
        .where(firebase.firestore.FieldPath.documentId(), 'in', cardStacksIds)
        .get();

db.getAllCardStacksFromSubject = async (subjectId) => {
    const doc = await db.getSubject(subjectId);
    if (!doc.data() || !doc.data().cardStacks) return {docs: []};
    return db.getCardStacks(doc.data().cardStacks);
};

db.addCardStack = async (subjectId, name) => {
    const cardStack = await firebase.firestore()
        .collection(collectionsCardStacks)
        .add({
            name: name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    await db.addCardStackToSubject(subjectId, cardStack.id)
    return cardStack.get();
};

db.addCardToCardStack = (cardStackId, cardId) =>
    firebase.firestore()
        .collection(collectionsCardStacks)
        .doc(cardStackId)
        .update({cards: firebase.firestore.FieldValue.arrayUnion(cardId)});

db.deleteCardFromCardStack = (cardStackId, cardId) =>
    firebase.firestore()
        .collection(collectionsCardStacks)
        .doc(cardStackId)
        .update({cards: firebase.firestore.FieldValue.arrayRemove(cardId)})

db.deleteCardStack = (cardStackId) => firebase.firestore().collection(collectionsCardStacks).doc(cardStackId).delete();

db.updateCardStack = (cardStackId, newName) =>
    firebase.firestore().collection(collectionsCardStacks).doc(cardStackId).update({'name': newName})

db.getCard = (cardId) =>
    firebase.firestore()
        .collection(collectionCards)
        .doc(cardId)
        .get();

db.getCards = (cardIds) =>
    firebase.firestore()
        .collection(collectionCards)
        .where(firebase.firestore.FieldPath.documentId(), 'in', cardIds)
        .get();

db.addCard = async (cardStackId, question, answer) => {
    let card = await firebase.firestore()
        .collection(collectionCards)
        .add({
            question: question,
            answer: answer,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    await db.addCardToCardStack(cardStackId, card.id)
    return card.get();
};

db.updateCard = (cardId, newQuestion, newAnswer) => {
    let updates = {};
    if (newQuestion) updates['question'] = newQuestion;
    if (newAnswer) updates['answer'] = newAnswer;
    return firebase.firestore().collection(collectionCards).doc(cardId).update(updates);
}

db.deleteCard = (cardId, cardStackId) => {
    db.deleteCardFromCardStack(cardStackId, cardId)
        .catch(e => console.error(e));
    return firebase.firestore().collection(collectionCards).doc(cardId).delete();
}

export default db;