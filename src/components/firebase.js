import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCBts1hYulPxVhRSF9KcmnqvtDTkVDtb_0",
    authDomain: "memory-16673.firebaseapp.com",
    databaseURL: "https://memory-16673.firebaseio.com",
    projectId: "memory-16673",
    storageBucket: "memory-16673.appspot.com",
    messagingSenderId: "936696917806",
    appId: "1:936696917806:web:10b60a199256222298d4bf",
    measurementId: "G-QRE8G51YL7"
};
firebase.initializeApp(config);

export default firebase;