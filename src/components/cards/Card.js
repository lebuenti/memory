import React, {useState} from "react";

export default function Card(props) {
    const [flip, setFlip] = useState(false);
    return <div>
        <div className="row">
            <div id="test" className={(flip ? 'flip ' : '') + "flip-container"}>
                <div className="flipper">
                    <div className="front">
                        <div className="card cardFront">{props.question}</div>
                    </div>
                    <div className="back">
                        <div className="card cardFront">{props.answer}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <button className="switch button" onClick={() => {
                setFlip(!flip);
            }}>
                <i className="fas fa-redo icon"/>
            </button>
        </div>
    </div>
}