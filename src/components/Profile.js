import React, {useEffect} from "react";
import firebase from "./firebase";

export default function Profile(props) {
    useEffect(() => {
        const db = firebase.firestore();

        //TODO delete this
        db.collection('user').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().user} => ${doc.data().email}`);
            });
        });
    });

    return <div>Ich bin eine ProfilSeite</div>;
}