import React, {useState} from "react";
import uuid from "./uuid";
import CardStack from "./CardStack";

export default function Subject(props) {
    const [cardStack, setCardStack] = useState([]);
    const [cardName, setCardName] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCardStack(curr => [{id: uuid(), name: cardName}, ...curr]);
        handleReset();
    };

    const handleReset = () => {
        setShowInput(false);
        setCardName('');
    };

    return <div className="subject" style={{backgroundColor: props.color}}>
        <div className="row subjectHeader">
            <div className="col">
                <h2>{props.name}</h2>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <button className='add card' onClick={() => {
                    setShowInput(true);
                }}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
        </div>

        <div className="row newCards" style={{display: showInput ? 'flex' : 'none'}}>
            <div className="cards">
                <div className="row">
                    <div className="card cardBack"/>
                </div>
                <div className="row">
                    <div className="card cardMiddle"/>
                </div>
                <div className="row">
                    <div className="card cardFront">
                        <div className="row formAdd">
                            <form onSubmit={handleSubmit}>
                                <div className="col">
                                    <h5>New card stack</h5>
                                </div>
                                <div className="col">
                                    <label>
                                        <input type="text" value={cardName} placeholder="Geometry"
                                               onChange={e => setCardName(e.target.value)}/>
                                    </label>
                                </div>
                                <div className="col">
                                    <button type="reset" className="buttonReset" onClick={handleReset}>
                                        <i className="fas fa-times icon"/>
                                    </button>
                                    <button type="submit" className="buttonSuccess">
                                        <i className="fas fa-check icon"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="oldCards">
            {cardStack.map(stack => (
                <CardStack key={stack.id} name={stack.name}/>
            ))}
        </div>
    </div>
}