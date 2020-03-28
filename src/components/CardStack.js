import React from "react";

export default function CardStack(props) {
    const openCards = () => {
        props.goTo('cards/' + props.id);
    };

    return <div className="row oldCards" onClick={openCards}>
        <div className="cards">
            <div className="row">
                <div className="card cardBack"/>
            </div>
            <div className="row">
                <div className="card cardMiddle"/>
            </div>
            <div className="row">
                <div className="card cardFront">{props.name}</div>
            </div>
        </div>
    </div>
}