import React, {useEffect, useState} from "react";
import App from "./app/App";
import LoginView from "./login/LoginView";
import db from "../db/db";

export default function Entry() {
    const [content, setContent] = useState('');

    useEffect(() => {
        db.getCurrentUser().then((user) => {
            if (user) {
                setContent('app');
            } else {
                setContent('login');
            }
        }).catch((error) => console.error("Cannot load user " + error));

    }, []);

    return <>
        {function () {
            if (content === "app") {
                return <App logout={() => setContent('login')}/>
            } else if (content === "login") {
                return <LoginView login={() => {
                    history.pushState({}, '', '/');
                    setContent('app')
                }}/>;
            } else {
                return "loading";
            }
        }()}
    </>
}