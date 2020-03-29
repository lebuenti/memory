import React, {useState} from 'react';
import ReactDOM from "react-dom";
import App from './App';
import "../style/login.scss"
import "../style/main.scss"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        ReactDOM.render(
            <App/>,
            document.getElementById('root')
        );
    };

    const handleReset = () => {
        /*setShowInput(false);
        setCardName('');*/
    };

    const openRegister = () => {

    };

    return <div id="loginBody">
        <div id="login">
            <div className="row">
                <div className="row formAdd">
                    <form onSubmit={handleSubmit}>
                        <div className="col" id="headerLogin">
                            <h1>memory</h1>
                        </div>
                        <div className="col">
                            <h5>Login</h5>
                        </div>
                        <div className="col">
                            <p onClick={openRegister}>or register</p>
                        </div>
                        <div className="col">
                            <label>
                                <input type="text" value={username} placeholder="Username"
                                       onChange={e => setUsername(e.target.value)}/>
                            </label>
                        </div>
                        <div className="col">
                            <label>
                                <input type="password" value={password}
                                       onChange={e => setPassword(e.target.value)}/>
                            </label>
                        </div>
                        <div className="col">
                            <button type="reset" className="buttonReset" onClick={handleReset}>
                                <i className="fas fa-times icon"/>
                            </button>
                            <button type="submit" className="buttonSuccess">
                                <i className="fas fa-check icon"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}