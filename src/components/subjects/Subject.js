import React, {useEffect, useState} from "react";
import CardStack from "../cardStacks/CardStack";
import toast from "../../util/toast";
import db from "../../db/db";
import CardStackInput from "../cardStacks/CardStackInput";
import loading from "../../util/loading";
import UpdateMenu from "../app/UpdateMenu";
import SubjectInput from "./SubjectInput";
import SwipeButton from "../inputFields/SwipeButton";

export default function Subject(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        db.getAllCardStacksFromSubject(props.id)
            .then(({docs}) =>
                docs.sort((a, b) => a.data().timestamp - b.data().timestamp)
                    .forEach(doc =>
                        setCardStacks(curr => [{id: doc.id, name: doc.data().name, cards: doc.data().cards}, ...curr])))
            .catch((error) => {
                toast.fail('Could not load cards stacks from database');
                console.error(error);
            });
    }, []);

    const submit = (cardStack) => {
        loading();
        return db.addCardStack(props.id, cardStack.name)
            .then(doc => setCardStacks(curr => [{id: doc.id, name: doc.data().name, cards: doc.data().cards}, ...curr]))
            .catch((error) => console.error(error))
            .finally(() => loading.stop());
    };

    const deleteSubject = () => {
        const deleteFunction = (() => {
            loading();
            db.deleteSubject(props.id)
                .then(() => {
                    props.goTo('/');
                    toast.success('subject deleted');
                })
                .catch(error => console.error(error))
                .finally(() => loading.stop());
        });
        toast.info('deleting subject ' + props.name + ' ...', deleteFunction);
        setUpdateMode(false);
    };

    const handleUpdate = (newSubject) => {
        loading();
        return db.updateSubject(props.id, (newSubject.name !== props.name ? newSubject.name : undefined),
            (newSubject.color !== props.color ? newSubject.color : undefined))
            .then(() => {
                props.goTo('/')
                toast.success('updated subject')
            })
            .finally(() => loading.stop())
    }

    return <div className={updateMode ? 'colorfulRow updateMode' : 'colorfulRow'}
                style={{'backgroundColor': props.color, 'borderColor': props.color}}>
        <div className="row subjectHeader">
            <div className="col">
                <h2 style={{'color': (updateMode ? props.color : 'black')}}>{props.name}</h2>
            </div>
            <UpdateMenu iconColor={props.color} onClick={() => {
                if (!updateMode) setShowInput(false);
                setUpdateMode(!updateMode);
            }}/>
        </div>

        {updateMode ? <SubjectInput oldName={props.name} oldColor={props.color} nameLabel={'New Name'} colorLabel={'New Color'}
                                    submit={changes => handleUpdate(changes)}
                                    setShowInput={(value) => setShowInput(value)}/> : ''}
        <div id={"newCardStack"} className="row" style={{'display': (updateMode ? 'none' : 'flex')}}>
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
                <h3>New card stack</h3>
            </div>
        </div>

        {updateMode ? <SwipeButton text={"Swipe to delete subject"} onSuccess={() => deleteSubject()}/> : ''}

        <div className={showInput ? "visible" : "invisible"}>
            <CardStackInput submit={(cardStack) => submit(cardStack)} setShowInput={(value) => setShowInput(value)}/>
        </div>

        {updateMode ? '' :
            <div className={"cardStacksContainer"}>
                {cardStacks.map(stack => (
                    <CardStack key={stack.id} id={stack.id} name={stack.name} cards={stack.cards} goTo={(value) => props.goTo(value)}/>
                ))}
            </div>}
    </div>
}