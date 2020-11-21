import toast from "../../util/toast";
import React, {useState} from "react";
import loading from "../../util/loading";
import "./cards.scss"

export default function CardInput(props) {
    const [inputError, setInputError] = useState({question: false, answer: false});
    const [card, setCard] = useState({question: props.question || '', answer: props.answer || ''});
    const showAnswer = (props.showAnswer === undefined ? true : props.showAnswer);
    const showQuestion = (props.showQuestion === undefined ? true : props.showQuestion);

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            answer: card.answer.length === 0 && showAnswer,
            question: card.question.length === 0 && showQuestion
        });
        if ((card.question.length === 0 && showQuestion)) {
            toast.fail('Question is empty');
            return;
        }
        if ((card.answer.length === 0 && showAnswer)) {
            toast.fail('Answer ist empty');
            return;
        }

        loading();
        props.submit(card);
        handleReset();
    };

    const handleReset = () => {
        props.setShowInput(false);
        setInputError({question: false, answer: false});
        setCard({question: '', answer: ''});
    };

    return <form id={"formNewCard"} onSubmit={handleSubmit}>
        {showQuestion ? <>
            <div className="row">
                <label>{props.questionLabel || 'Question'}</label>
            </div>
            <div className="row">
            <textarea className={(inputError.question ? 'inputError' : '')}
                      value={card.question} placeholder={'Question'}
                      onChange={e => setCard({...card, question: e.target.value})}/>
            </div>
        </> : ''
        }

        {showAnswer ? <>
            <div className="row">
                <label>{props.answerLabel || 'Answer'}</label>
            </div>
            <div className="row">
            <textarea className={(inputError.answer ? 'inputError' : '')}
                      value={card.answer} placeholder={'Answer'}
                      onChange={e => setCard({...card, answer: e.target.value})}/>
            </div>
        </> : ''}

        <div className="row center">
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