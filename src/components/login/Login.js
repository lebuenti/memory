import React, {useState} from 'react';
import ReactDOM from "react-dom";
import App from "../App.js";
import firebase from "firebase";

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error))
            .then(() => {
                ReactDOM.render(
                    <App/>,
                    document.getElementById('root')
                );
            });
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
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
                <label>
                    <input type="text" value={email} placeholder="email"
                           onChange={e => setEmail(e.target.value)}/>
                </label>
            </div>
            <div className="col">
                <label>
                    <input type="password" value={password} placeholder="password"
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
}