import React, {useState} from "react";

export default function Card(props) {
    const [flip, setFlip] = useState(false);

    return <>
        <div className="flipper-card row">
            <div className={(flip ? 'flip ' : '') + "flip-container"}>
                <div className="flipper">
                    <div className="front">
                        <div className="bigCards card cardFront">
                            {props.question}
                        </div>
                    </div>
                    <div className="back">
                        <div className="bigCards card cardFront">
                            {props.answer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flipper-card row">
            <div className="col">
                <button className="buttonFlip button" onClick={() => setFlip(!flip)}>
                    <i className="fas fa-redo icon"/>
                </button>
            </div>
        </div>
    </>
}