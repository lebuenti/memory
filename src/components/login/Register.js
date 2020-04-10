import React, {useState} from "react";
import firebase from "firebase";
import ReactDOM from "react-dom";
import App from "../App";
import {toast} from "../toast/toast";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        if (email.length === 0) {
            setEmailError(true);
            toast.fail('Email is empty');
            if (password.length !== 0) return;
        }

        if (password.length === 0) {
            setPasswordError(true);
            toast.fail('Password is empty');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                toast.success('Account was created');
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        console.error(error.message);
                        toast.fail('Could not logged in. Pls try to login with your new account again.');
                        history.pushState({}, '', '/');
                    })
                    .then(() => {
                        ReactDOM.render(
                            <App/>,
                            document.getElementById('root')
                        );
                    });
            })
            .catch((error) => {
                toast.fail(error.message);
                if (error.message.includes('email') || error.message.includes('user')) setEmailError(true);
                if (error.message.includes('assword')) setPasswordError(true);
            });
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
        setEmailError(false);
        setPasswordError(false);
    };

    return <div>

        <div className="row">
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
        </div>

        <div className="row formAdd">
            <form onSubmit={handleSubmit}>

                <div className="col">
                    <h2>Register</h2>
                </div>
                <div className="col">
                    <label>
                        Email
                    <input className={(emailError ? 'inputError' : '')} type="text" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div className="col">
                    <label>
                        Password
                    <input className={(passwordError ? 'inputError' : '')} type="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    </label>
                </div>
                <div className="col">
                    <button type="reset" className="buttonReset button" onClick={handleReset}>
                        <i className="fas fa-times icon"/>
                    </button>
                    <button type="submit" className="buttonSuccess button">
                        <i className="fas fa-check icon"/>
                    </button>
                </div>
            </form>
        </div>
    </div>
}