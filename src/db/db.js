import firebase from "./firebase";

const collectionSubjects = 'subjects';
const collectionsCardStacks = 'cardStacks';
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
            resolve(firebase.firestore().collection(collectionSubjects)
                .where('user', '==', user.uid)
                .get())
        });
    });
};

db.getSubject = async (subjectId) => {
    return firebase.firestore().collection(collectionSubjects)
        .doc(subjectId)
        .get()
};

db.getSubjectByCardStackId = async (cardStackId) => {
    return new Promise((resolve) => {
        db.getSubjects().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                if (doc.data().cardStacks && doc.data().cardStacks.includes(cardStackId)) {
                    resolve(doc);
                }
            })
        })
    });
};

db.addSubject = async (color, name) => {
    return new Promise(resolve => {
        db.getCurrentUser().then((user) => {
            resolve(firebase.firestore().collection(collectionSubjects)
                .add({
                    color: color,
                    name: name,
                    user: user.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }))
        })
    })
};

db.addCardStackToSubject = async (subjectId, cardStackId) => {
    return firebase.firestore().collection(collectionSubjects)
        .doc(subjectId)
        .update({
            cardStacks: firebase.firestore.FieldValue.arrayUnion(cardStackId)
        })
};

db.getAllCardsFromCardStack = async (cardStackId) => {
    return new Promise(resolve => {
        db.getCardStack(cardStackId)
            .then((doc) => {
                if (!doc.data() || !doc.data().cards) return;
                resolve(db.getCards(doc.data().cards));
            })
            .catch((error) => {
                console.error(error);
            })
    })
};

db.getCardStack = async (cardStackId) => {
    return firebase.firestore().collection(collectionsCardStacks)
        .doc(cardStackId)
        .get()
};

db.getCardStacks = async (cardStacksIds) => {
    return firebase.firestore().collection(collectionsCardStacks)
        .where(firebase.firestore.FieldPath.documentId(), 'in', cardStacksIds)
        .get()
};

db.getAllCardStacksFromSubject = async (subjectId) => {
    return new Promise(resolve => {
        db.getSubject(subjectId)
            .then((doc) => {
                if (!doc.data() || !doc.data().cardStacks) return;
                resolve(db.getCardStacks(doc.data().cardStacks))
            })
    })
};

db.addCardStack = async (subjectId, name) => {
    return new Promise((resolve) => {
        firebase.firestore().collection(collectionsCardStacks)
            .add({
                name: name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((docCardStack) =>
                db.addCardStackToSubject(subjectId, docCardStack.id)
                    .then(() => {
                        resolve({id: docCardStack.id, name: name})
                    }).catch((error) => {
                    console.error(error);
                }))
            .catch((error) => {
                console.error(error);
            })
    });
};

db.addCardToCardStack = async (cardStackId, cardId) => {
    return firebase.firestore().collection(collectionsCardStacks)
        .doc(cardStackId)
        .update({cards: firebase.firestore.FieldValue.arrayUnion(cardId)})
};

db.deleteCardStack = async (cardStackId) => {
    return firebase.firestore().collection(collectionsCardStacks).doc(cardStackId).delete();
};

db.getCard = async (cardId) => {
    return firebase.firestore().collection(collectionCards)
        .doc(cardId)
        .get()
};

db.getCards = async (cardIds) => {
    return firebase.firestore().collection(collectionCards)
        .where(firebase.firestore.FieldPath.documentId(), 'in', cardIds)
        .get()
};

db.addCard = async (cardStackId, question, answer) => {
    return new Promise(resolve => {
        firebase.firestore().collection(collectionCards)
            .add({
                question: question,
                answer: answer,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((dbCard) => {
                db.addCardToCardStack(cardStackId, dbCard.id)
                    .then(() => {
                        resolve({id: dbCard.id, question: question, answer: answer})
                    }).catch((error) => {
                        console.error(error);
                    }
                );
            }).catch((error) => {
                console.error(error);
            }
        );
    });
};

export default db;