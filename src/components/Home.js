import React, {Component} from "react";

export default class Home extends Component {
    render() {
        return <>
            <div className="row">
                <div className="col">
                    <button className='add'>
                        <i className="fas fa-plus icon"/>
                    </button>
                </div>
            </div>

            <div className="subject">
                <div className="row subjectHeader">
                    <div className="col">
                        <h2>Mathe</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="cards">
                        <div className="row">
                            <div className="card cardBack"/>
                        </div>
                        <div className="row">
                            <div className="card cardMiddle"/>
                        </div>
                        <div className="row">
                            <div className="card cardFront">Binomische Formeln</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    }
}