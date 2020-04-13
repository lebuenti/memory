import React, {useEffect, useState} from 'react';
import "../../style/login.scss"
import "../../style/main.scss"
import Login from "./Login";
import Register from "./Register";

export default function LoginView(props) {
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        window.onpopstate = () => decideContent();
        return () => window.onpopstate = undefined;
    }, []);

    useEffect(() => {
        decideContent();
    }, []);

    const decideContent = () => {
        if (location.pathname.endsWith('register')) {
            setShowRegister(true);
        } else if (location.pathname.endsWith('/')) {
            setShowRegister(false)
        }
    };

    return <div id="loginBody">
        <div id="login">
            <div>
                {showRegister ? <Register login={props.login}/>
                    : <Login login={props.login} showRegister={(value) => {
                        setShowRegister(value);
                        history.pushState({}, '', 'register');
                    }}/>}
            </div>
        </div>
    </div>
}