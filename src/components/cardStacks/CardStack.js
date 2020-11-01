import "./cardStacks.scss"
import React from "react";

export default function CardStack(props) {
    const openCards = () => props.goTo('cards/' + props.id);

    return <div className="cardStack" onClick={openCards}>
        <div className="row">
            <div className="card cardBack"/>
        </div>
        <div className="row">
            <div className="card cardMiddle"/>
        </div>
        <div className="row">
            <div className="card cardFront">
                <label id='cardStackLengthLabel'>
                    {(props.cards) ? props.cards.length : 0}
                </label>
                {props.name}
            </div>
        </div>
    </div>
}