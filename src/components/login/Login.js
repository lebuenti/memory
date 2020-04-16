import React from 'react';
import db from "../../db/db";
import LoginRegisterInput from "./LoginRegisterInput";

export default function Login(props) {
    const submit = (user) => {
        return db.login(user.email, user.password).then(() => props.login());
    };

    return <div>
        <div className="row">
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
        </div>
        <div className="formAdd">
            <div className="row">
                <div className="col">
                    <h2>Login</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p onClick={() => props.showRegister(true)}>or register</p>
                </div>
            </div>
            <LoginRegisterInput submit={(value) => submit(value)}/>
        </div>
    </div>
}