import React, {useState} from 'react';
import ReactDOM from "react-dom";
import App from "../App.js";
import firebase from "firebase";
import toast from "../../toast/toast";

export default function Login(props) {
    const [user, setUser] = useState({email: '', password: ''});
    const [inputError, setInputError] = useState({email: false, password: false});

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            email: user.email.length === 0,
            password: user.password.length === 0
        });

        if (user.email.length === 0 || user.password.length === 0) {
            if (user.email.length === 0) toast.fail('Email is empty');
            if (user.password.length === 0) toast.fail('Password ist empty');
            return;
        }

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                ReactDOM.render(
                    <App/>,
                    document.getElementById('root')
                );
            })
            .catch((error) => {
                toast.fail(error.message);
                if (error.code.includes('email') || error.code.includes('user')) setInputError({...inputError, email: true});
                if (error.code.includes('password')) setInputError({...inputError, password: true});
            })
    };

    const handleReset = () => {
        setUser({email: '', password: ''});
        setInputError({email: false, password: false});
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
                    <h2>Login</h2>
                </div>
                <div className="col">
                    <p onClick={() => props.showRegister(true)}>or register</p>
                </div>
                <div className="col">
                    <label>
                        Email
                        <input className={(inputError.email ? 'inputError' : '')} type="text" value={user.email}
                               onChange={e => setUser({...user, email: e.target.value})}/>
                    </label>
                </div>
                <div className="col">
                    <label>
                        Password
                        <input className={(inputError.password ? 'inputError' : '')} type="password"
                               value={user.password}
                               onChange={e => setUser({...user, password: e.target.value})}/>
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