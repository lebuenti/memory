import React, {useEffect, useState} from "react";
import CardStack from "./CardStack";
import toast from "../../toast/toast";
import db from "../../db/db";
import CardStackInput from "./CardStackInput";

export default function Subject(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        db.getAllCardStacksFromSubject(props.id)
            .then((docsCardStacks) => {
                docsCardStacks.docs.forEach(docCardStack => {
                    setCardStacks(curr => [{id: docCardStack.id, name: docCardStack.data().name}, ...curr]);
                })
            }).catch((error) => {
                toast.fail('Could not load cards stacks from database');
                console.error(error);
            }
        );
    }, []);

    const submit = (cardStack) => {
        return db.addCardStack(props.id, cardStack.name)
            .then((dbCardStack) => {
                setCardStacks(curr => [dbCardStack, ...curr]);
            });
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
            <CardStackInput submit={(cardStack) => submit(cardStack)} setShowInput={(value) => setShowInput(value)}/>
        </div>

        <div id="oldCards">
            {cardStacks.map(stack => (
                <CardStack key={stack.id} id={stack.id} name={stack.name} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </div>
}