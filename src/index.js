import React from "react";
import LoginView from './components/login/LoginView'
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import firebase from "./db/firebase"
import App from "./components/App";

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(
            <App/>,
            document.getElementById('root')
        );
    } else {
        ReactDOM.render(
            <LoginView/>,
            document.getElementById('root')
        );
    }
});

