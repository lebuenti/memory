import React, {useEffect, useState} from "react";
import firebase from "../../db/firebase";

export default function Profile() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        let user = firebase.auth().currentUser;
        if (user) setEmail(user.email);
    },[] );

    const handleSubmit = () => {
        history.pushState({}, '', '/');
        firebase.auth().signOut().then().catch((error)=> console.error(error));
    };

    return <div>
        <div className="row">{email}</div>
        <div className="row">
            <button type="submit" onClick={handleSubmit} className="button buttonReset">
                <i className="fas fa-sign-out-alt icon"/> Logout
            </button>
        </div>
    </div>;
}