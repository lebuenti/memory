import '../style/main.scss';
import React, {useEffect, useState} from "react";
import Home from "./Home";
import Profile from "./Profile";
import Learning from "./Learning";

export default function App() {
    const [content, setContent] = useState('home');

    useEffect(() => {
        setContentFromPath();
    }, []);

    useEffect(() => {
        let popstateListener = () => setContentFromPath();
        window.addEventListener("popstate", popstateListener);
        return () => window.removeEventListener("popstate", popstateListener)
    }, []);

    const nextPage = (value) => {
        setContent(() => {
            if (value === "home") history.pushState(value, value, "/");
            else history.pushState(value, value, value);
            return value;
        });
    };

    const setContentFromPath = () => {
        if (location.pathname.endsWith('profile')) {
            setContent('profile');
        } else if (location.pathname.endsWith('learning')) {
            setContent('learning');
        } else if (location.pathname.endsWith('/')) {
            setContent('home');
        }
    };

    return <>
        <div className="header">
            <div className="row">
                <div className="col">
                    <h1>memory</h1>
                </div>
            </div>
        </div>

        <div id="content">
            {function () {
                if (content === "home") {
                    return <Home/>;
                } else if (content === "profile") {
                    return <Profile/>;
                } else if (content === "learning") {
                    return <Learning/>;
                }
            }()}
        </div>

        <footer className="footer">
            <div className="row">
                <div className="col">
                    <button onClick={() => nextPage("home")}>
                        <i className="fas fa-home icon"/>
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => nextPage("learning")}>
                        <i className="fas fa-redo icon"/>
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => nextPage("profile")}>
                        <i className="fas fa-user icon"/>
                    </button>
                </div>
            </div>
        </footer>
    </>;
}