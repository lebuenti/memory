import React, {useEffect, useState} from "react";
import CardStack from "./CardStack";
import firebase from "../../db/firebase";
import toast from "../../toast/toast";

const collectionSubject = 'subject';
const collectionsCardstacks = 'cardstacks';

export default function Subject(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [cardStack, setCardStack] = useState({name: ''});
    const [showInput, setShowInput] = useState(false);
    const [inputError, setInputError] = useState({cardStackName: false});

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
                            setCardStacks(curr => [{id: docCardstack.id, name: docCardstack.data().name}, ...curr]);
                        })
                });
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            cardStackName: cardStack.name.length === 0
        });

        if (cardStack.name.length === 0) {
            toast.fail('Name of card stack is empty');
            return;
        }

        firebase.firestore().collection(collectionsCardstacks)
            .add({
                name: cardStack.name
            })
            .then((docRef) => {
                firebase.firestore().collection(collectionSubject)
                    .doc(props.id)
                    .update({
                        cardstacks: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    })
                    .then(() => {
                        setCardStacks(curr => [{id: docRef.id, name: cardStack.name}, ...curr]);
                        handleReset();
                    })
            })
    };

    const handleReset = () => {
        setShowInput(false);
        setCardStack({name: ''});
        setInputError({cardStackName: false});
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
        </div>

        <div id="oldCards">
            {cardStacks.map(stack => (
                <CardStack key={stack.id} id={stack.id} name={stack.name} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </div>
}