import React, {Component} from "react";

class App extends Component {
    render() {
        return <>
            <div className="header">
                <div className="row">
                    <div className="col">
                        <h1>memory</h1>
                    </div>
                </div>
            </div>

            <div id="content"/>

            <footer className="footer">
                <div className="row">
                    <div className="col"><i className="fas fa-home"/></div>
                    <div className="col"><i className="fas fa-redo"/></div>
                    <div className="col"><i className="fas fa-user"/></div>
                </div>
            </footer>
        </>;
    }
}

export default App;