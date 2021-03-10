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

    return <div className="login-register-content">
        <div className="row">
            <div className="col login-register-header">
                <h1>memory</h1>
            </div>
        </div>
        <div className="formAdd">
            <div className="row login-register-subheader">
                <h2>Login</h2>
            </div>
            <div className="row" id="col-register-link">
                <p onClick={() => props.showRegister(true)}>or register</p>
            </div>
            <LoginRegisterInput submit={(value) => submit(value)}/>
        </div>
    </div>
}