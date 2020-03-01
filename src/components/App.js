import '../style/main.scss';
import React, {Component} from "react";
import Home from './Home'

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

            <div id="content">
                <Home/>
            </div>

            <footer className="footer">
                <div className="row">
                    <div className="col">
                        <button>
                            <i className="fas fa-home"/>
                        </button>
                    </div>
                    <div className="col">
                        <button>
                            <i className="fas fa-redo"/>
                        </button>
                    </div>
                    <div className="col">
                        <button>
                            <i className="fas fa-user"/>
                        </button>
                    </div>
                </div>
            </footer>
        </>;
    }
}

export default App;