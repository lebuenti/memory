import React, {useState, useEffect} from "react";
import firebase from "../../db/firebase";

export default function Profile() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setEmail(user.email);
            }
        });
    });

    return <div>{email}</div>;
}