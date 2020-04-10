import React, {useState} from 'react';
import ReactDOM from "react-dom";
import App from "../App.js";
import firebase from "firebase";
import {toast} from "../toast/toast";

export default function Login(props) {
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

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                ReactDOM.render(
                    <App/>,
                    document.getElementById('root')
                );
            })
            .catch((error) => {
                toast.fail(error.message);
                if (error.code.includes('email') || error.code.includes('user')) setEmailError(true);
                if (error.code.includes('password')) setPasswordError(true);
            })
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
        setEmailError(false);
        setPasswordError(false);
    };

    return <div className="row formAdd">
        <form onSubmit={handleSubmit}>
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
            <div className="col">
                <h5>Login</h5>
            </div>
            <div className="col">
                <p onClick={() => props.showRegister(true)}>or register</p>
            </div>
            <div className="col">
                <input className={(emailError ? 'inputError' : '')} type="text" value={email} placeholder="email"
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="col">
                <input className={(passwordError ? 'inputError' : '')} type="password"
                       value={password} placeholder="password"
                       onChange={e => setPassword(e.target.value)}/>
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
}