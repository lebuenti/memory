import React, {useState} from "react";

export default function Card(props) {
    const [flip, setFlip] = useState(false);

    return <div>
        <div className="row">
            <div id="test" className={(flip ? 'flip ' : '') + "flip-container"}>
                <div className="flipper">
                    <div className="front">
                        <div className="middelBigCards card cardFront">
                            <label className="cardLabel">Question</label>
                            {props.question}
                        </div>
                    </div>
                    <div className="back">
                        <div className="middelBigCards card cardFront">
                            <label className="cardLabel">Answer</label>
                            {props.answer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button className="buttonInfo small switch button" onClick={() => setFlip(!flip)}>
                    <i className="fas fa-redo icon"/>
                </button>
            </div>
        </div>
    </div>
}