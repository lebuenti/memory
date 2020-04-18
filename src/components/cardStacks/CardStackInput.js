import React, {useState} from "react"
import toast from "../../toast/toast";

export default function CardStackInput(props) {
    const [inputError, setInputError] = useState({cardStackName: false});
    const [cardStack, setCardStack] = useState({name: ''});

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            cardStackName: cardStack.name.length === 0
        });
        if (cardStack.name.length === 0) {
            toast.fail('Name of card stack is empty');
            return;
        }
        handleReset();

        props.submit(cardStack).catch((error) => {
            toast.fail('Could not save card stack into database');
            console.error(error);
        });
    };

    const handleReset = () => {
        props.setShowInput(false);
        setCardStack({name: ''});
        setInputError({cardStackName: false});
    };

    return <div className="cards">
        <div className="row">
            <div className="card cardBack"/>
        </div>
        <div className="row">
            <div className="card cardMiddle"/>
        </div>
        <div className="row">
            <div className="card cardFront cardBigger">
                <div className="row formAdd">
                    <form onSubmit={handleSubmit}>
                        <div className="col">
                            <h3>New card stack</h3>
                        </div>
                        <div className="col">
                            <label>
                                Name
                                <input className={(inputError.cardStackName ? 'inputError' : '')}
                                       type="text" value={cardStack.name} placeholder="Geometry"
                                       onChange={e => setCardStack({name: e.target.value})}/>
                            </label>
                        </div>
                        <div className="col">
                            <button type="reset" className="buttonReset button" onClick={handleReset}>
                                <i className="fas fa-times icon"/>
                            </button>
                            <button type="submit" className="buttonSuccess button">
                                <i className="fas fa-check icon"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}