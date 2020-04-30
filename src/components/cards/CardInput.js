import toast from "../../util/toast";
import React, {useState} from "react";
import loading from "../../util/loading";

export default function (props) {
    const [inputError, setInputError] = useState({question: false, answer: false});
    const [flip, setFlip] = useState(false);
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
        props.submit(card).then(() => {
            clearInput();
        }).catch((error) => {
            toast.fail('Could not save card into database');
            console.error(error);
        }).finally(() => loading.stop());
    };

    const clearInput = () => {
        setCard({question: '', answer: ''});
        setInputError({answer: false, question: false});
        setFlip(false);
    };

    return <form onSubmit={handleSubmit}>
        <div className="row">
            <div id="test" className={(flip ? 'flip ' : '') + "flip-container addCard"}>
                <div className="flipper addCard">
                    <div className="front addCard">
                        <div className="card cardFront addCard">
                            <div>
                                <div className="row">
                                    <label>
                                        Question
                                        <textarea className={(inputError.question ? 'inputError' : '')}
                                                  placeholder="Pythagoras' theorem"
                                                  value={card.question} onChange={e => setCard({...card, question: e.target.value})}>
                                        </textarea>
                                    </label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button type="reset" className="buttonReset button" onClick={() => {
                                            props.setShowInput(false);
                                            clearInput();
                                        }}>
                                            <i className="fas fa-times icon"/>
                                        </button>
                                        <button type="submit" className="buttonSuccess button">
                                            <i className="fas fa-check icon"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="back addCard">
                        <div className="card cardFront addCard">
                            <div>
                                <div className="row">
                                    <label>
                                        Answer
                                        <textarea className={(inputError.answer ? 'inputError' : '')}
                                                  placeholder="a^2 + b^2 = c^2"
                                                  value={card.answer} onChange={e => setCard({...card, answer: e.target.value})}>
                                        </textarea>
                                    </label>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button type="reset" className="buttonReset button" onClick={() => {
                                            props.setShowInput(false);
                                            clearInput();
                                        }}>
                                            <i className="fas fa-times icon"/>
                                        </button>
                                        <button type="submit" className="buttonSuccess button">
                                            <i className="fas fa-check icon"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <button type="button" className="buttonUpdate switch button" onClick={() => setFlip(!flip)}>
                <i className="fas fa-redo icon"/>
            </button>
        </div>
    </form>
}