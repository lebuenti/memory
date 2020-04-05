import React, {useEffect, useState} from "react";
import "../../style/cardview.scss";
import Card from "./Card";
import firebase from "../../db/firebase";

const collectionsCardstacks = 'cardstacks';
const collectionCards = 'cards';

export default function CardView() {
    const [showInput, setShowInput] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flip, setFlip] = useState(false);
    const [cardStackname, setCardstackname] = useState('');
    const [cardStackId, setCardStackId] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        let i = location.pathname.lastIndexOf('/');
        let sub = location.pathname.substring(i + 1, location.pathname.length);
        if (sub.length < 20) {
            //throw error
            console.error('id from cardstack is less then 20 chars!');
            return;
        }

        setCardStackId(() => {
            firebase.firestore().collection(collectionsCardstacks)
                .doc(sub)
                .get()
                .then((doc) => {
                    setCardstackname(doc.data().name);
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
    };

    return <div id="cardview">
        <div className="row">
            <div className="col">
                <h3>{cardStackname}</h3>
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
                                            <textarea placeholder="Your question"
                                                      value={question} onChange={e => setQuestion(e.target.value)}>
                                                {question}
                                            </textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <button type="reset" className="buttonReset button" onClick={() => {
                                                    if (question === '') {
                                                        setShowInput(false);
                                                        clearInput();
                                                    } else {
                                                        setQuestion('');
                                                    }
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
                                            <textarea placeholder="Your answer"
                                                      value={answer} onChange={e => setAnswer(e.target.value)}>
                                                {answer}
                                            </textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <button type="reset" className="buttonReset button" onClick={() => {
                                                    if (answer === '') {
                                                        setShowInput(false);
                                                        clearInput();
                                                    } else {
                                                        setAnswer('');
                                                    }
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