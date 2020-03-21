import React from "react";

export default function Subject(props) {
    return <div className="subject">
        <div className="row subjectHeader">
            <div className="col">
                <h2>{props.name}</h2>
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
}