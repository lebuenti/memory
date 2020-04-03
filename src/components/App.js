import '../style/main.scss';
import React, {useEffect, useState} from "react";
import Home from "./Home";
import Profile from "./profile/Profile";
import Learning from "./learning/Learning";
import CardView from "./cards/CardView";

export default function App() {
    const [content, setContent] = useState('home');

    useEffect(() => {
        setContentFromPath();
    }, []);

    useEffect(() => {
        window.onpopstate = () => setContentFromPath();
        return () => window.onpopstate = undefined;
    }, []);

    const nextPage = (value) => {
        setContent(() => {
            if (value === "home") window.history.pushState({}, '', "/");
            else window.history.pushState({}, '', value);
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
        } else if (location.pathname.match('cards')) {
            setContent('cards');
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
                    return <Home goTo={(value) => {
                        nextPage(value);
                        setContentFromPath();
                    }}/>;
                } else if (content === "profile") {
                    return <Profile/>;
                } else if (content === "learning") {
                    return <Learning/>;
                } else if (content === "cards") {
                    return <CardView/>
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