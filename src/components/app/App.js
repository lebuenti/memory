import '../../style/main.scss';
import React, {useEffect, useState} from "react";
import SubjectsView from "../subjects/SubjectsView";
import Profile from "../profile/Profile";
import Learning from "../learning/Learning";
import CardView from "../cards/CardView";
import Header from "./Header";
import Footer from "./Footer";
import loading from "../../util/loading";

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
        } else if (location.pathname === '/') {
            setContent('subjectsView');
        } else {
            setContent('404');
        }
    };

    return <>
        <Header/>

        <div id="content">
            {function () {
                loading.stop();
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
                    return <CardView goTo={(value) => {
                        nextPage(value);
                        setContentFromPath();
                    }}/>
                } else if (content === null) {
                    loading();
                    return '';
                } else if (content === '404') {
                    return '404 page not found';
                }
            }()}
        </div>

        <Footer nextPage={(value) => nextPage(value)}/>
    </>;
}