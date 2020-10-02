import React, {useState} from "react"
import toast from "../../util/toast";

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

    return <form onSubmit={handleSubmit}>
        <div className="row">
            <label>Name</label>
        </div>
        <div className="row">
            <input className={(inputError.cardStackName ? 'inputError' : '')}
                   type="text" value={cardStack.name} placeholder="Geometry"
                   onChange={e => setCardStack({name: e.target.value})}/>
        </div>
        <div className="row center more-space">
            <div className="col">
                <button type="reset" className="buttonReset button" onClick={handleReset}>
                    <i className="fas fa-times icon"/>
                </button>
            </div>
            <div className="col">
                <button type="submit" className="buttonSuccess button">
                    <i className="fas fa-check icon"/>
                </button>
            </div>
        </div>
    </form>
}