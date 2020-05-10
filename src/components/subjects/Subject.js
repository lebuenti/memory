import React, {useEffect, useState} from "react";
import CardStack from "../cardStacks/CardStack";
import toast from "../../util/toast";
import db from "../../db/db";
import CardStackInput from "../cardStacks/CardStackInput";
import loading from "../../util/loading";
import AreUSureDialog from "../AreUSureDialog";

export default function Subject(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [areUSureDialog, setAreUSureDialog] = useState(false);

    useEffect(() => {
        loading();
        db.getAllCardStacksFromSubject(props.id)
            .then((docs) => {
                let sorted = docs.docs.sort((a, b) => {
                    if (a.data().timestamp > b.data().timestamp) return 1;
                    else if (a.data().timestamp < b.data().timestamp) return -1;
                    return 0;
                });
                sorted.forEach(doc => {
                    setCardStacks(curr => [{id: doc.id, name: doc.data().name, cards: doc.data().cards}, ...curr]);
                });
            }).catch((error) => {
            toast.fail('Could not load cards stacks from database');
            console.error(error);
        }).finally(() => loading.stop());
    }, []);

    const submit = (cardStack) => {
        loading();
        return db.addCardStack(props.id, cardStack.name)
            .then((dbCardStack) => {
                setCardStacks(curr => [dbCardStack, ...curr]);
            }).catch((error) => console.error(error))
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
        setAreUSureDialog(!areUSureDialog);
    };

    return <div className="subject" style={{backgroundColor: props.color}}>
        <div className="row subjectHeader">
            <div className="col">
                <h2>{props.name}</h2>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <button className='buttonReset card button' onClick={() => setAreUSureDialog(!areUSureDialog)}>
                    <i className="fas fa-trash icon"/>
                </button>
            </div>
            <div className="col">
                <button className='buttonSuccess card button' onClick={() => setShowInput(!showInput)}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
            <div className="col">
                <button className='buttonUpdate card button' onClick={() => setShowInput(!showInput)}>
                    <i className="fas fa-pen icon"/>
                </button>
            </div>
        </div>

        <div className="row newCards" style={{display: showInput ? 'flex' : 'none'}}>
            <CardStackInput submit={(cardStack) => submit(cardStack)} setShowInput={(value) => setShowInput(value)}/>
        </div>
        <div className="row" style={{display: areUSureDialog ? 'flex' : 'none'}}>
            <div className="col">
                <AreUSureDialog message={"Really delete subject " + props.name + " and all card stacks?"}
                                onReset={() => setAreUSureDialog(!areUSureDialog)} onSubmit={() => deleteSubject()}/>
            </div>
        </div>

        <div id="oldCards">
            {cardStacks.map(stack => (
                <CardStack key={stack.id} id={stack.id} name={stack.name} cards={stack.cards} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </div>
}