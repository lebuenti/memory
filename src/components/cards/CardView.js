import React, {useEffect, useState} from "react";
import "../../style/cardview.scss";
import Card from "./Card";
import firebase from "../../db/firebase";
import {toast} from "../toast/toast";

const collectionsCardstacks = 'cardstacks';
const collectionCards = 'cards';

export default function CardView() {
    const [showInput, setShowInput] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flip, setFlip] = useState(false);
    const [cardStackName, setCardStackName] = useState('');
    const [cardStackId, setCardStackId] = useState('');
    const [cards, setCards] = useState([]);
    const [questionError, setQuestionError] = useState(false);
    const [answerError, setAnswerError] = useState(false);

    useEffect(() => {
        let i = location.pathname.lastIndexOf('/');
        let sub = location.pathname.substring(i + 1, location.pathname.length);
        if (sub.length < 20) {
            toast.fail('id from card stack is less then 20 chars!');
            return;
        }

        setCardStackId(() => {
            firebase.firestore().collection(collectionsCardstacks)
                .doc(sub)
                .get()
                .then((doc) => {
                    setCardStackName(doc.data().name);
                    if (!doc.data().cards) return;

                    doc.data().cards.forEach((cardId) => {
                        firebase.firestore().collection(collectionCards)
                            .doc(cardId)
                            .get()
                            .then((docCard) => {
                                setCards(curr => [{id: cardId, question: docCard.data().question, answer: docCard.data().answer}, ...curr]);
                            })
                    })
                });
            return sub;
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuestionError(false);
        setAnswerError(false);

        if (question.length === 0) {
            setQuestionError(true);
            toast.fail('question is empty');
            if (answer.length !== 0) return;
        }
        if (answer.length === 0) {
            setAnswerError(true);
            toast.fail('answer is empty');
            return;
        }

        firebase.firestore().collection(collectionCards)
            .add({
                question: question,
                answer: answer
            })
            .then((cardId) => {
                firebase.firestore().collection(collectionsCardstacks)
                    .doc(cardStackId)
                    .update({cards: firebase.firestore.FieldValue.arrayUnion(cardId.id)})
                    .then(() => {
                        setCards(curr => [{id: cardId.id, question: question, answer: answer}, ...curr]);
                        clearInput();
                        setShowInput(false);
                    })
            })
    };

    const clearInput = () => {
        setQuestion('');
        setAnswer('');
        setQuestionError(false);
        setAnswerError(false);
    };

    return <div className="cardview">
        <div className="row">
            <div className="col">
                <h3>{cardStackName}</h3>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <button className='add button' onClick={() => {
                    setShowInput(true);
                }}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
        </div>

        <div className="row" style={{display: showInput ? 'flex' : 'none'}}>
            <form onSubmit={handleSubmit}>

                <div className="row">
                    <div id="test" className={(flip ? 'flip ' : '') + "flip-container addCard"}>
                        <div className="flipper addCard">
                            <div className="front addCard">
                                <div className="card cardFront addCard">
                                    <div>
                                        <div className="row">
                                            <label>
                                                Question
                                                <textarea className={(questionError ? 'inputError' : '')}
                                                          placeholder="Pythagoras' theorem"
                                                          value={question} onChange={e => setQuestion(e.target.value)}>
                                                {question}
                                            </textarea>
                                            </label>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <button type="reset" className="buttonReset button" onClick={() => {
                                                    setShowInput(false);
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
                                                <textarea className={(answerError ? 'inputError' : '')}
                                                          placeholder="a^2 + b^2 = c^2"
                                                          value={answer} onChange={e => setAnswer(e.target.value)}>
                                                {answer}
                                            </textarea>
                                            </label>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <button type="reset" className="buttonReset button" onClick={() => {
                                                    setShowInput(false);
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
                    <button type="button" className="switch button" onClick={() => {
                        setFlip(!flip);
                    }}>
                        <i className="fas fa-redo icon"/>
                    </button>
                </div>
            </form>
        </div>

        <div className="row oldCards">
            <div className="cards">
                {cards.map(card => (
                    <Card key={card.id} id={card.id} answer={card.answer} question={card.question}/>
                ))}
            </div>
        </div>
    </div>

}