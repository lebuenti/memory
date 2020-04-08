import React, {useState} from "react";
import firebase from "firebase";
import ReactDOM from "react-dom";
import App from "../App";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        if (email.length === 0) {
            setEmailError(true);
            //TODO Toast
            console.error('Email is empty');
            if (password.length !== 0) return;
        }

        if (password.length === 0) {
            setPasswordError(true);
            //TODO Toast
            console.error('Password is empty');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                //TODO Toast
                //success creation.
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        console.error(error.message);
                        //TODO toast
                        //(konntest nicht eingeloggt werden? -> jump to login site?
                    })
                    .then(() => {
                        ReactDOM.render(
                            <App/>,
                            document.getElementById('root')
                        );
                    });
            })
            .catch((error) => {
                console.error(error.message);
                //TODO toast
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

    return <div className="row formAdd">
        <form onSubmit={handleSubmit}>
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
            <div className="col">
                <h5>Register</h5>
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