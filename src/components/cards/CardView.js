import React, {useEffect, useState} from "react";
import "../../style/cardview.scss";
import Card from "./Card";
import firebase from "../../db/firebase";

const collectionsCardstacks = 'cardstacks';

export default function CardView() {
    const [cardStackname, setCardstackname] = useState('');
    const [cards, setCards] = useState([]);


    useEffect(() => {
        let i = location.pathname.lastIndexOf('/');
        let cardStackId = location.pathname.substring(i + 1, location.pathname.length);
        if (cardStackId.length < 20) {
            //throw error
            console.error('id from cardstack is less then 20 chars!');
            return;
        }

        firebase.firestore().collection(collectionsCardstacks)
            .doc(cardStackId)
            .get()
            .then((doc) => {
                setCardstackname(doc.data().name);
                if (!doc.data().cards) return;

                doc.data().cards.forEach((cardId) => {
                    firebase.firestore().collection('cards')
                        .doc(cardId)
                        .get()
                        .then((docCard) => {
                            setCards(curr => [{id: cardId, question: docCard.data().question, answer: docCard.data().answer}, ...curr]);
                        })
                })
            })
    }, []);

    return <div id="cardview">
        <div className="row">
            <div className="col">
                <h3>{cardStackname}</h3>
            </div>
        </div>
        <div>Add new Card</div>
        <div className="row oldCards">

            <div className="cards">
                {cards.map(card => (
                    <Card key={card.id} id={card.id} answer={card.answer} question={card.question}/>
                ))}
            </div>
        </div>
    </div>

}