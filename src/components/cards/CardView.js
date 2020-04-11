import React, {useEffect, useState} from "react";
import "../../style/cardview.scss";
import Card from "./Card";
import firebase from "../../db/firebase";
import toast from "../../toast/toast";

const collectionsCardstacks = 'cardstacks';
const collectionCards = 'cards';

export default function CardView() {
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({question: '', answer: ''});
    const [cardStack, setCardStack] = useState({name: '', id: ''});

    const [flip, setFlip] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputError, setInputError] = useState({question: false, answer: false});

    useEffect(() => {
        let i = location.pathname.lastIndexOf('/');
        let sub = location.pathname.substring(i + 1, location.pathname.length);
        if (sub.length < 20) {
            toast.fail('id from card stack is less then 20 chars!');
            return;
        }

        setCardStack(() => {
            let result = {name: '', id: sub};
            firebase.firestore().collection(collectionsCardstacks)
                .doc(sub)
                .get()
                .then((doc) => {
                    result.name = doc.data().name;

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
            return result;
        });
    }, []);

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

        firebase.firestore().collection(collectionCards)
            .add({
                question: card.question,
                answer: card.answer
            })
            .then((cardId) => {
                firebase.firestore().collection(collectionsCardstacks)
                    .doc(cardStack.id)
                    .update({cards: firebase.firestore.FieldValue.arrayUnion(cardId.id)})
                    .then(() => {
                        setCards(curr => [{id: cardId.id, question: card.question, answer: card.answer}, ...curr]);
                        clearInput();
                        setShowInput(false);
                    })
            })
    };

    const clearInput = () => {
        setCard({question: '', answer: ''});
        setInputError({answer: false, question: false});
    };

    return <div className="cardview">
        <div className="row">
            <div className="col">
                <h3>{cardStack.name}</h3>
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
                                                <textarea className={(inputError.question ? 'inputError' : '')}
                                                          placeholder="Pythagoras' theorem"
                                                          value={card.question} onChange={e => setCard({...card, question: e.target.value})}>
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
                                                <textarea className={(inputError.answer ? 'inputError' : '')}
                                                          placeholder="a^2 + b^2 = c^2"
                                                          value={card.answer} onChange={e => setCard({...card, answer: e.target.value})}>
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
                {cards.map(c => (
                    <Card key={c.id} id={c.id} answer={c.answer} question={c.question}/>
                ))}
            </div>
        </div>
    </div>

}