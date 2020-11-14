import React, {useState} from "react";
import UpdateMenu from "../app/UpdateMenu";
import "./cards.scss"
import CardInput from "./CardInput";
import db from "../../db/db";
import loading from "../../util/loading";
import toast from "../../util/toast";

export default function Card(props) {
    const [flip, setFlip] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [card, setCard] = useState({id: props.id, answer: props.answer, question: props.question});
    const iconColor = '#706e6e';

    const updateCard = (updatedCard) => {
        db.updateCard(props.id, updatedCard.question, updatedCard.answer)
            .then(() => {
                if (updatedCard.question) setCard({...card, question: updatedCard.question});
                if (updatedCard.answer) setCard({...card, answer: updatedCard.answer});
                setUpdateMode(false);
                toast.success('Updated card');
            })
            .catch(e => console.error(e))
            .finally(() => loading.stop());
    }

    return <>
        <div className="flipper-card row">
            <div className={(flip ? 'flip ' : '') + "flip-container " + (updateMode ? 'update' : '')}>
                <div className="flipper">
                    <div className="front">
                        <div className={"bigCards card cardFront " + (updateMode ? 'update' : '')}>
                            <UpdateMenu iconColor={iconColor} onClick={() => setUpdateMode(!updateMode)}/>
                            {updateMode ? <CardInput showAnswer={false} question={props.question}
                                                     questionLabel={'New Question'} setShowInput={() => setUpdateMode(false)}
                                                     submit={(changedCard) => updateCard(changedCard)}/>
                                : card.question}

                        </div>
                    </div>
                    <div className="back">
                        <div className={"bigCards card cardFront " + (updateMode ? 'update' : '')}>
                            <UpdateMenu iconColor={iconColor} onClick={() => setUpdateMode(!updateMode)}/>
                            {updateMode ? <CardInput showQuestion={false} answer={props.answer}
                                                     answerLabel={'New Answer'} setShowInput={() => setUpdateMode(false)}
                                                     submit={(changedCard) => updateCard(changedCard)}/>
                                : card.answer}
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