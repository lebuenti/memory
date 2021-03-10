import React from 'react';
import db from "../../db/db";
import LoginRegisterInput from "./LoginRegisterInput";
import loading from "../../util/loading";

export default function Login(props) {
    const submit = (user) => {
        loading();
        return db.login(user.email, user.password).then(() => {
            props.login();
        }).finally(() => loading.stop());
    };

    return <div id="login-content">
        <div className="row">
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
        </div>
        <div className="formAdd">
            <div className="row" id="subHeaderLogin">
                <h2>Login</h2>
            </div>
            <div className="row" id="col-register-link">
                <p onClick={() => props.showRegister(true)}>or register</p>
            </div>
            <LoginRegisterInput submit={(value) => submit(value)}/>
        </div>
    </div>
}