import React, {useEffect, useState} from "react";
import firebase from "../db/firebase";
import App from "./app/App";
import LoginView from "./login/LoginView";

export default function Entry() {
    const [content, setContent] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                setContent('app');
            } else {
                setContent('login');
            }
        });
    }, []);

    return <>
        {function () {
            if (content === "app") {
                return <App/>
            } else if (content === "login") {
                return <LoginView/>;
            } else {
                return "loading";
            }
        }()}
    </>
}