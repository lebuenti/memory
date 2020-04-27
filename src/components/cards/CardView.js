import React, {useEffect, useState} from "react";
import "../../style/cardview.scss";
import Card from "./Card";
import toast from "../../util/toast";
import db from "../../db/db";
import CardInput from "./CardInput";
import loading from "../../util/loading";

export default function CardView() {
    const [cards, setCards] = useState([]);
    const [cardStack, setCardStack] = useState({name: '', id: ''});
    const [showInput, setShowInput] = useState(false);
    const [subject, setSubject] = useState({});

    useEffect(() => {
        let i = location.pathname.lastIndexOf('/');
        let sub = location.pathname.substring(i + 1, location.pathname.length);
        if (sub.length < 20) {
            toast.fail('id from card stack is less then 20 chars!');
            return;
        }

        loading();
        db.getCardStack(sub)
            .then(dbCardStack => setCardStack({name: dbCardStack.data().name, id: dbCardStack.id}))
            .catch((error) => {
                toast.fail('Can\'t find a card stack with the id ' + sub);
                console.error('Can\'t find a card stack with the id ' + sub + '\n' + error);
            }).finally(() => loading.stop());

        db.getAllCardsFromCardStack(sub)
            .then((docs) => {
                let sorted = docs.docs.sort((a, b) => {
                    if (a.data().timestamp > b.data().timestamp) return 1;
                    else if (a.data().timestamp < b.data().timestamp) return -1;
                    return 0;
                });
                sorted.forEach(doc => setCards(curr => [{id: doc.id, question: doc.data().question, answer: doc.data().answer}, ...curr]));
            })
            .catch((error) => {
                toast.fail('Can\'t find cards from the card stack with the id: ' + sub);
                console.error('Can\'t find cards from the card stack with the id: ' + sub + '\n' + error);
            }).finally(() => {
                loading.stop()
        });

        db.getSubjectByCardStackId(sub)
            .then((doc) => {
                setSubject({name: doc.data().name, color: doc.data().color});
            })
            .catch((error) => {
                console.error(error);
                toast.fail('Cannot load subject from the current card stack');
            }).finally(() => loading.stop());
    }, []);

    const submit = (newCard) => {
        loading();
        return db.addCard(cardStack.id, newCard.question, newCard.answer)
            .then((dbCard) => {
                setCards(curr => [dbCard, ...curr]);
                setShowInput(false);
            })
            .catch((error) => console.error(error))
            .finally(() => loading.stop());
    };

    return <div className="cardview">
        <div id="cardHeaderAndButton" style={{'backgroundColor': subject.color}}>

            <div className="row">
                <div className="col">
                    <h2>{cardStack.name}</h2>
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

            <div className="row" style={{display: showInput ? 'flex' : 'none'}}>
                <CardInput submit={(newCard) => submit(newCard)} setShowInput={(value) => setShowInput(value)}/>
            </div>
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