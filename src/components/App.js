import '../style/main.scss';
import React, {useEffect, useState} from "react";
import Home from "./Home";
import Profile from "./Profile";
import Learning from "./Learning";

export default function App() {
    window.addEventListener("popstate", () => setContentFromPath(setContent));
    const [content, setContent] = useState('home');

    useEffect(() => {
        setContentFromPath(setContent);
    });

    let tmp = getJSXObjects(content);
    return <>
        <div className="header">
            <div className="row">
                <div className="col">
                    <h1>memory</h1>
                </div>
            </div>
        </div>

        <div id="content">
            {tmp}
        </div>

        <footer className="footer">
            <div className="row">
                <div className="col">
                    <button onClick={() => nextPage(setContent, "home")}>
                        <i className="fas fa-home icon"/>
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => nextPage(setContent, "learning")}>
                        <i className="fas fa-redo icon"/>
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => nextPage(setContent, "profile")}>
                        <i className="fas fa-user icon"/>
                    </button>
                </div>
            </div>
        </footer>
    </>;
}

function nextPage(setContent, content) {
    setContent(content);
    if (content === "home") history.pushState(content, content, "/");
    else history.pushState(content, content, content);
}

function getJSXObjects(content) {
    if (content === "home") {
        return <Home/>;
    } else if (content === "profile") {
        return <Profile/>;
    } else if (content === "learning") {
        return <Learning/>;
    }
}

function setContentFromPath(setContent) {
    if (location.pathname.endsWith('profile')) {
        setContent('profile');
    } else if (location.pathname.endsWith('learning')) {
        setContent('learning');
    } else if (location.pathname.endsWith('/')) {
        setContent('home');
    }
}