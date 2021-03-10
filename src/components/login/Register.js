import React from "react";
import toast from "../../util/toast";
import db from "../../db/db";
import LoginRegisterInput from "./LoginRegisterInput";
import loading from "../../util/loading";

export default function Register(props) {
    const submit = (user) => {
        loading();
        return db.createUser(user.email, user.password)
            .then(() => {
                toast.success('Account was created');
                db.login(user.email, user.password)
                    .then(() => {
                        props.login();
                    }).catch((error) => {
                    console.error(error.message);
                    toast.fail('Could not logged in. Pls try to login with your new account again.');
                    history.pushState({}, '', '/');
                });
            }).finally(() => loading.stop());
    };

    return <div className="login-register-content">
        <div className="row">
            <div className="col login-register-header">
                <h1>memory</h1>
            </div>
        </div>
        <div className="formAdd">
            <div className="row login-register-subheader" id="subheader-register">
                <h2>Register</h2>
            </div>
            <LoginRegisterInput submit={(user) => submit(user)}/>
        </div>
    </div>
}