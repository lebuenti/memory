import "./cardStacks.scss"
import React from "react";

export default function CardStack(props) {
    const openCardStackView = () => props.goTo('cards/' + props.subject + '/' + props.name);

    return <div className="cardStack" onClick={openCardStackView}>
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