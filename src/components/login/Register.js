import React from "react";
import toast from "../../toast/toast";
import db from "../../db/db";
import LoginRegisterInput from "./LoginRegisterInput";

export default function Register(props) {
    const submit = (user) => {
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
                    }
                );
            });
    };

    return <div>
        <div className="row">
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
        </div>
        <div className=" formAdd">
            <div className="row">


                <div className="col">
                    <h2>Register</h2>
                </div>
            </div>
            <LoginRegisterInput submit={(user) => submit(user)}/>
        </div>
    </div>
}