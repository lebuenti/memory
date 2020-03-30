import React, {useState} from 'react';
import "../../style/login.scss"
import "../../style/main.scss"
import Login from "./Login";
import Register from "./Register";

export default function LoginView() {
    const [showRegister, setShowRegister] = useState(false);

    return <div id="loginBody">
        <div id="login">
            <div className="row">
                {showRegister || location.pathname.endsWith('register') ? <Register/> : <Login showRegister={(value) => {
                    setShowRegister(value);
                    history.pushState({}, '', 'register');
                }}/>}
            </div>
        </div>
    </div>
}