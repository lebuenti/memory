import React, {useEffect, useState} from "react";
import "./cardStackView.scss";
import Card from "../cards/Card";
import toast from "../../util/toast";
import db from "../../db/db";
import loading from "../../util/loading";
import UpdateMenu from "../app/UpdateMenu";
import CardInput from "../cards/CardInput";
import SwipeButton from "../inputFields/SwipeButton";
import CardStackInput from "./CardStackInput";

export default function CardStackView(props) {
    const [cards, setCards] = useState([]);
    const [cardStack, setCardStack] = useState({name: '', id: '', cards: []});
    const [showInput, setShowInput] = useState(false);
    const [subject, setSubject] = useState({});
    const [updateMode, setUpdateMode] = useState(false);

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
                setSubject({name: doc.data().name, color: doc.data().color, id: doc.id});
            })
            .catch((error) => {
                console.error(error);
                toast.fail('Cannot load subject from the current card stack');
            }).finally(() => loading.stop());
    }, []);

    const deleteCardStack = () => {
        const deleteFunction = (() => {
            loading();
            db.deleteCardStack(cardStack.id)
                .then(() => {
                    props.goTo('subjectsView');
                    history.pushState({}, '', '/');
                    toast.success('card stack deleted');
                })
                .catch(error => console.error(error))
                .finally(() => loading.stop());
        });
        toast.info('deleting ' + cardStack.name + ' ...', deleteFunction);
        setUpdateMode(false);
    };

    const addCard = (newCard) => {
        loading();
        db.addCard(cardStack.id, newCard.question, newCard.answer)
            .then((doc) => {
                setCards(curr => [{id: doc.id, question: doc.data().question, answer: doc.data().answer}, ...curr]);
                setShowInput(false);
            })
            .catch((error) => console.error(error))
            .finally(() => loading.stop());
    };

    const handleUpdate = (cardStackUpdate) => {
        db.updateCardStack(cardStack.id, cardStackUpdate.name, subject.id)
            .then(() => {
                setCardStack({...cardStack, name: cardStackUpdate.name})
                setUpdateMode(false);
                toast.success('Updated subject');
            })
            .catch((e) => {
                console.error(e);
                toast.fail(e);
            })
    }

    return <div className="cardview">
        <div className={updateMode ? 'colorfulRow updateMode' : 'colorfulRow'}
             style={{'backgroundColor': subject.color, 'borderColor': subject.color}}>
            <div className="row">
                <div className="col">
                    <h2>{cardStack.name}</h2>
                </div>
                <UpdateMenu iconColor={subject.color} onClick={() => {
                    setUpdateMode(!updateMode);
                    setShowInput(false);
                }}/>
            </div>

            {updateMode ?
                <CardStackInput nameLabel={"New name"} name={cardStack.name} submit={(cardStackUpdate) => handleUpdate(cardStackUpdate)}
                                setShowInput={(value) => setShowInput(value)}/>
                : ""}
            {updateMode ? <SwipeButton text={"Swipe to delete card stack and all cards"} onSuccess={() => deleteCardStack()}/> : ''}

            <div id={"newCard"} className="row" style={{'display': (updateMode ? 'none' : 'flex')}}>
                <div className="col">
                    <button className={'buttonSuccess ' + (showInput ? "invisible" : "visible")}
                            onClick={() => setShowInput(!showInput)}>
                        <i className="fas fa-plus icon"/>
                    </button>
                    <button className={'buttonReset ' + (showInput ? "visible" : "invisible")}
                            onClick={() => setShowInput(!showInput)}>
                        <i className="fas fa-times icon"/>
                    </button>
                </div>
                <div className="col">
                    <h3>New card</h3>
                </div>
            </div>

            <div className={showInput ? "visible" : "invisible"}>
                <CardInput submit={(newCard) => addCard(newCard)} setShowInput={(value) => setShowInput(value)}/>
            </div>
        </div>

        <div className={"allCards"}>
            {cards.map(c => (
                <Card onDeletedCard={(deletedCard) => setCards([...cards.filter(card => card.id !== deletedCard.id)])}
                      key={c.id} id={c.id} answer={c.answer} question={c.question}
                      cardStackId={cardStack.id}/>
            ))}
        </div>
    </div>

}