import '../style/main.scss';
import React, {Component} from "react";
import Home from "./Home";
import Profile from "./Profile";
import Learning from "./Learning";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
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

    changeState(state) {
        this.setState(
            {content: state}
        );
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
                        <button onClick={this.changeState.bind(this, "home")}>
                            <i className="fas fa-home icon"/>
                        </button>
                    </div>
                    <div className="col">
                        <button onClick={this.changeState.bind(this, "learning")}>
                            <i className="fas fa-redo icon"/>
                        </button>
                    </div>
                    <div className="col">
                        <button onClick={this.changeState.bind(this, "profile")}>
                            <i className="fas fa-user icon"/>
                        </button>
                    </div>
                </div>
            </footer>
        </>;
    }
}

export default App;