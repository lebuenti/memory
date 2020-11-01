import toast from "../../util/toast";
import React, {useState} from "react";
import loading from "../../util/loading";

export default function (props) {
    const [inputError, setInputError] = useState({question: false, answer: false});
    const [card, setCard] = useState({question: '', answer: ''});

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            answer: card.answer.length === 0,
            question: card.question.length === 0
        });
        if (card.question.length === 0 || card.answer.length === 0) {
            if (card.question.length === 0) toast.fail('Question is empty');
            if (card.answer.length === 0) toast.fail('Answer ist empty');
            return;
        }

        loading();
        props.submit(card)
            .then(() => handleReset())
            .catch((error) => {
                toast.fail('Could not save card into database');
                console.error(error);
            })
            .finally(() => loading.stop());
    };

    const handleReset = () => {
        props.setShowInput(false);
        setInputError({question: false, answer: false});
        setCard({question: '', answer: ''});
    };

    return <form onSubmit={handleSubmit}>
        <div className="row">
            <label>{props.nameLabel || 'Question'}</label>
        </div>
        <div className="row">
            <input className={(inputError.question ? 'inputError' : '')}
                   type="text" value={card.question} placeholder={'Question'}
                   onChange={e => setCard({...card, question: e.target.value})}/>
        </div>
        <div className="row">
            <label>{props.colorLabel || 'Answer'}</label>
        </div>
        <div className="row">
            <input className={(inputError.answer ? 'inputError' : '')}
                   type="text" value={card.answer} placeholder={'Answer'}
                   onChange={e => setCard({...card, answer: e.target.value})}/>
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