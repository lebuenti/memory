import '../../style/main.scss';
import React, {useEffect, useState} from "react";
import SubjectsView from "../subjects/SubjectsView";
import Profile from "../profile/Profile";
import Learning from "../learning/Learning";
import CardView from "../cards/CardView";

export default function App(props) {
    const [content, setContent] = useState(null);

    useEffect(() => {
        setContentFromPath();
    }, []);

    useEffect(() => {
        window.onpopstate = () => setContentFromPath();
        return () => window.onpopstate = undefined;
    }, []);

    const nextPage = (value) => {
        setContent(() => {
            if (value === "subjectsView") window.history.pushState({}, '', "/");
            else window.history.pushState({}, '', value);
            return value;
        });
    };

    const setContentFromPath = () => {
        if (location.pathname.endsWith('profile')) {
            setContent('profile');
        } else if (location.pathname.endsWith('learning')) {
            setContent('learning');
        } else if (location.pathname.match('cards')) {
            setContent('cards');
        } else {
            setContent('subjectsView');
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
                if (content === "subjectsView") {
                    return <SubjectsView goTo={(value) => {
                        nextPage(value);
                        setContentFromPath();
                    }}/>;
                } else if (content === "profile") {
                    return <Profile logout={props.logout}/>;
                } else if (content === "learning") {
                    return <Learning/>;
                } else if (content === "cards") {
                    return <CardView/>
                } else if (content === null) {
                    return 'loading';
                }
            }()}
        </div>

        <footer className="footer">
            <div className="row">
                <div className="col">
                    <button onClick={() => nextPage("subjectsView")}>
                        <i className="fas fa-home icon"/>
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => nextPage("learning")}>
                        <i className="fas fa-graduation-cap icon"/>
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