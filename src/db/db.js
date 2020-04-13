import firebase from "./firebase";

const collectionSubject = 'subject';
const collectionsCardStacks = 'cardstacks';
const collectionCards = 'cards';

const db = () => {
};

db.getCurrentUser = () => {
    return new Promise((resolve => firebase.auth().onAuthStateChanged((user) => {
            resolve(user)
        })
    ));
};

db.login = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
};

db.logout = async () => {
    return firebase.auth().signOut()
};

db.createUser = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
};

db.getSubjects = async () => {
    return new Promise((resolve) => {
        db.getCurrentUser().then((user) => {
            resolve(firebase.firestore().collection(collectionSubject)
                .where('user', '==', user.uid)
                .get())
        });
    });
};

db.getSubject = async (subjectId) => {
    return firebase.firestore().collection(collectionSubject)
        .doc(subjectId)
        .get()
};

db.addSubject = async (color, name) => {
    return new Promise(resolve => {
        db.getCurrentUser().then((user) => {
            resolve(firebase.firestore().collection(collectionSubject)
                .add({
                    color: color,
                    name: name,
                    user: user.uid
                }))
        })
    })
};

db.addCardStackToSubject = async (subjectId, cardStackId) => {
    return firebase.firestore().collection(collectionSubject)
        .doc(subjectId)
        .update({
            cardstacks: firebase.firestore.FieldValue.arrayUnion(cardStackId)
        })
};

db.getCardStack = async (cardStackId) => {
    return firebase.firestore().collection(collectionsCardStacks)
        .doc(cardStackId)
        .get()
};

db.addCardStack = async (name) => {
    return firebase.firestore().collection(collectionsCardStacks)
        .add({
            name: name
        })
};

db.addCardToCardStack = async (cardStackId, cardId) => {
    return firebase.firestore().collection(collectionsCardStacks)
        .doc(cardStackId)
        .update({cards: firebase.firestore.FieldValue.arrayUnion(cardId)})
};

db.getCard = async (cardId) => {
    return firebase.firestore().collection(collectionCards)
        .doc(cardId)
        .get()
};

db.addCard = async (question, answer) => {
    return firebase.firestore().collection(collectionCards)
        .add({
            question: question,
            answer: answer
        })
};

export default db;