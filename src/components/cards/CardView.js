import React, {useEffect, useState} from "react";
import "./cardview.scss";
import Card from "./Card";
import toast from "../../util/toast";
import db from "../../db/db";
import CardInput from "./CardInput";
import loading from "../../util/loading";
import UpdateMenu from "../app/UpdateMenu";
import DeleteAndSaveButtons from "../inputFields/DeleteAndSaveButtons";

export default function CardView(props) {
    const [cards, setCards] = useState([]);
    const [cardStack, setCardStack] = useState({name: '', id: ''});
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
                setSubject({name: doc.data().name, color: doc.data().color});
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
        <div className={updateMode ? 'colorfulRow updateMode' : 'colorfulRow'}
             style={{'backgroundColor': subject.color, 'borderColor': subject.color}}>
            <div className="row">
                <div className="col">
                    <h2>{cardStack.name}</h2>
                </div>
                <UpdateMenu iconColor={subject.color} onClick={() => {
                    let tmp = !updateMode;
                    setUpdateMode(tmp);
                    setShowInput(false);
                    if (!tmp) setAreUSureDialog(false);
                }}/>
            </div>

            <div className="row" style={{'display': (updateMode ? 'none' : 'flex')}}>
                <div className="col">
                    <button className='buttonSuccess card button' onClick={() => setShowInput(!showInput)}>
                        <i className="fas fa-plus icon"/>
                    </button>
                </div>
            </div>

            {updateMode ? <DeleteAndSaveButtons deleteMessage={"Really delete the card stack " + cardStack.name + " and all of its cards?"}
                                                handleDelete={() => deleteCardStack()}/> : ""}

            <div className="row" style={{display: showInput ? 'flex' : 'none'}}>
                <div className="col">
                    <CardInput submit={(newCard) => submit(newCard)} setShowInput={(value) => setShowInput(value)}/>
                </div>
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