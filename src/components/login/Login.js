import React, {useState} from 'react';
import ReactDOM from "react-dom";
import App from "../App.js";

export default function Login(props) {
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
}