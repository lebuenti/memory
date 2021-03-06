import React, {useEffect, useState} from "react";
import App from "./app/App";
import LoginView from "./login/LoginView";
import db from "../db/db";
import toast from "../util/toast";
import loading from "../util/loading";

export default function Entry() {
    const [content, setContent] = useState('');

    useEffect(() => {
        db.getCurrentUser().then((user) => {
            if (user) {
                setContent('app');
            } else {
                setContent('login');
            }
        }).catch((error) => {
            toast.fail('"Cannot load user "');
            console.error(error);
        });

    }, []);

    return <>
        {function () {
            loading.stop();
            if (content === "app") {
                return <App logout={() => setContent('login')}/>
            } else if (content === "login") {
                return <LoginView login={() => {
                    history.pushState({}, '', '/');
                    setContent('app')
                }}/>;
            } else {
                loading();
                return '';
            }
        }()}
    </>
}