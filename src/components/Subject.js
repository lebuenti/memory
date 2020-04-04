import React, {useEffect, useState} from "react";
import CardStack from "./CardStack";
import firebase from "../db/firebase";

const collectionSubject = 'subject';
const collectionsCardstacks = 'cardstacks';

export default function Subject(props) {
    const [cardStack, setCardStack] = useState([]);
    const [cardName, setCardName] = useState('');
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        firebase.firestore().collection(collectionSubject)
            .doc(props.id)
            .get()
            .then((docSubject) => {
                if (!docSubject.data().cardstacks) return;
                docSubject.data().cardstacks.forEach((cardstackId) => {

                    firebase.firestore().collection(collectionsCardstacks)
                        .doc(cardstackId)
                        .get()
                        .then((docCardstack) => {
                            setCardStack(curr => [{id: docCardstack.id, name: docCardstack.data().name}, ...curr]);
                        })
                });
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.firestore().collection(collectionsCardstacks)
            .add({
                name: cardName
            })
            .then((docRef) => {
                firebase.firestore().collection(collectionSubject)
                    .doc(props.id)
                    .update({
                        cardstacks: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    })
                    .then(() => {
                        setCardStack(curr => [{id: docRef.id, name: cardName}, ...curr]);
                        handleReset();
                    })
            })
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
                <button className='add card button' onClick={() => {
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
        </div>

        <div id="oldCards">
            {cardStack.map(stack => (
                <CardStack key={stack.id} id={stack.id} name={stack.name} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </div>
}