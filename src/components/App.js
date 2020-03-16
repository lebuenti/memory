import '../style/main.scss';
import React, {Component} from "react";
import Home from "./Home";
import Profile from "./Profile";
import Learning from "./Learning";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }

    componentDidMount() {
        this.callContentFromHistory();
        window.addEventListener("popstate", this.callContentFromHistory.bind(this));
    }

    callContentFromHistory() {
        if (location.pathname.endsWith('profile')) {
            this.changeContent('profile');
        } else if (location.pathname.endsWith('learning')) {
            this.changeContent('learning');
        } else if (location.pathname.endsWith('/')) {
            this.changeContent('home');
        }
    }

    getContent() {
        if (this.state.content === "home") {
            return <Home/>;
        } else if (this.state.content === "profile") {
            return <Profile/>;
        } else if (this.state.content === "learning") {
            return <Learning/>;
        }
        //throw error
    }

    changeContent(content) {
        this.setState({content: content}, () => {
            if (content === "home") history.pushState(this.state.content, content, "/");
            else history.pushState(this.state.content, content, content);
            console.log(window.history);
        });
    }

    render() {
        let content = this.getContent();
        return <>
            <div className="header">
                <div className="row">
                    <div className="col">
                        <h1>memory</h1>
                    </div>
                </div>
            </div>

            <div id="content">
                {content}
            </div>

            <footer className="footer">
                <div className="row">
                    <div className="col">
                        <button onClick={this.changeContent.bind(this, "home")}>
                            <i className="fas fa-home icon"/>
                        </button>
                    </div>
                    <div className="col">
                        <button onClick={this.changeContent.bind(this, "learning")}>
                            <i className="fas fa-redo icon"/>
                        </button>
                    </div>
                    <div className="col">
                        <button onClick={this.changeContent.bind(this, "profile")}>
                            <i className="fas fa-user icon"/>
                        </button>
                    </div>
                </div>
            </footer>
        </>;
    }
}