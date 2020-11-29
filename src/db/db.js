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

db.checkUniqueSubjectName = (name) =>
    db.getSubjects()
        .then(async qs => (await qs.docs.find(subject => subject.data().name === name)) == null)
        .catch((error) => console.error(error))

db.addSubject = async (color, name) => {
    if (await db.checkUniqueSubjectName(name)) {
        return await firebase.firestore()
            .collection(collectionSubjects)
            .add({
                color: color,
                name: name,
                user: (await db.getCurrentUser()).uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

    } else {
        return Promise.reject(new Error('Subject name already exists'));
    }
}

db.updateSubject = async (subjectId, newName, newColor) => {
    let updates = {};
    if (newName) {
        updates['name'] = newName;
        if (!(await db.checkUniqueSubjectName(newName))) return Promise.reject(new Error('Subject name already exists'));
    }
    if (newColor) updates['color'] = newColor;
    return firebase.firestore().collection(collectionSubjects).doc(subjectId).update(updates);
}

db.deleteSubject = (subjectId) => {
    return db.getAllCardStacksFromSubject(subjectId)
        .then(async ({docs}) => {
            docs.forEach(doc => db.deleteCardStack(doc.id).catch(e => console.error(e)))
            return await firebase.firestore().collection(collectionSubjects).doc(subjectId).delete();
        })
        .catch((error) => {
            console.error(error);
        });
}

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

db.getSubjectByName = (subjectName) => {
    return db.getSubjects()
        .then(async qs => {
            let tmp = await qs.docs.find(subject => subject.data().name === subjectName)
            if (tmp == null) {
                return Promise.reject(new Error('No subject to name ' + subjectName + ' found.'))
            } else {
                return tmp;
            }
        })
}

db.getCardStackByName = (subjectId, cardStackName) => {
    return db.getAllCardStacksFromSubject(subjectId)
        .then(async cardStacks => {
            let tmp = await cardStacks.docs.find(cardStack => cardStack.data().name === cardStackName)
            if (tmp == null) {
                return Promise.reject(new Error('No card stack to name ' + cardStackName + ' found.'))
            } else {
                return tmp;
            }
        })
        .catch(error => console.error(error))
}

db.getCardStacks = (cardStacksIds) =>
    firebase.firestore().collection(collectionsCardStacks)
        .where(firebase.firestore.FieldPath.documentId(), 'in', cardStacksIds)
        .get();

db.getAllCardStacksFromSubject = async (subjectId) => {
    const doc = await db.getSubject(subjectId);
    if (!doc.data() || !doc.data().cardStacks) return {docs: []};
    return db.getCardStacks(doc.data().cardStacks);
};

db.checkUniqueCardStackName = (subjectId, name) =>
    db.getAllCardStacksFromSubject(subjectId)
        .then(async ({docs}) => (await docs.find(cardStack => cardStack.data().name === name) == null))
        .catch(error => console.error(error))

db.addCardStack = async (subjectId, name) => {
    if (!(await db.checkUniqueCardStackName(subjectId, name))) {
        return Promise.reject(new Error('Card stack name already exists.'))
    } else {
        const cardStack = await firebase.firestore()
            .collection(collectionsCardStacks)
            .add({
                name: name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        await db.addCardStackToSubject(subjectId, cardStack.id)
        return cardStack.get();
    }
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

db.deleteCardStack = (cardStackId) => {
    return db.getAllCardsFromCardStack(cardStackId)
        .then(async ({docs}) => {
            docs.forEach(doc => db.deleteCard(doc.id).catch(e => console.error(e)))
            return await firebase.firestore().collection(collectionsCardStacks).doc(cardStackId).delete();
        })
        .catch((error) => {
            console.error(error);
        });
}

db.updateCardStack = async (cardStackId, newName, subjectId) => {
    if (!(await db.checkUniqueCardStackName(subjectId, newName))) {
        return Promise.reject(new Error('Card stack name already exists.'))
    } else {
        return firebase.firestore()
            .collection(collectionsCardStacks)
            .doc(cardStackId)
            .update({'name': newName})
    }
}

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

db.deleteCard = (cardId) => firebase.firestore().collection(collectionCards).doc(cardId).delete()

db.deleteCardAndDeleteCardFromCardStack = (cardId, cardStackId) => {
    db.deleteCardFromCardStack(cardStackId, cardId)
        .catch(e => console.error(e));
    return db.deleteCard(cardId);
}

export default db;