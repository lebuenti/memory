import React, {useEffect, useState} from "react";
import CardStack from "../cardStacks/CardStack";
import toast from "../../util/toast";
import db from "../../db/db";
import CardStackInput from "../cardStacks/CardStackInput";
import loading from "../../util/loading";
import HamburgerMenu from "../app/HamburgerMenu";
import DeleteAndSaveButtons from "../inputFields/DeleteAndSaveButtons";

export default function Subject(props) {
    const [cardStacks, setCardStacks] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [updates, setUpdates] = useState({color: props.color, name: props.name});

    useEffect(() => {
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
        });
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
        setUpdateMode(false);
    };

    const handleUpdate = () => {
        loading();
        return db.updateSubject(props.id, (updates.name !== props.name ? updates.name : undefined), (updates.color !== props.color ? updates.color : undefined))
            .then(() => {
                props.goTo('/')
                toast.success('updated subject')
            })
            .finally(() => loading.stop())
    }

    return <div className={updateMode ? 'subject updateMode' : 'subject'}
                style={{'backgroundColor': props.color, 'borderColor': props.color}}>
        <div className="row subjectHeader">
            <div className="col">
                {updateMode ? <input className="updateInput" type="text" value={updates.name}
                                     onChange={e => setUpdates({...updates, name: e.target.value})}
                                     style={{'borderColor': props.color}}/>
                    : <h2>{props.name}</h2>}
            </div>
            <HamburgerMenu iconColor={props.color} onClick={() => {
                setUpdateMode(!updateMode)
            }}/>
        </div>
        {updateMode ? <div className="row">
            <div className="col">
                <input type="color" value={updates.color}
                       onChange={e => setUpdates({...updates, color: e.target.value})}/>
            </div>
        </div> : ''}

        <div className="row" style={{'display': (updateMode ? 'none' : 'flex')}}>
            <div className="col">
                <button className='buttonSuccess card button' onClick={() => setShowInput(!showInput)}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
        </div>

        {updateMode ? <DeleteAndSaveButtons deleteMessage={"Really delete subject " + props.name + " and all card stacks?"}
                                            handleDelete={() => deleteSubject()}
                                            handleSave={() => handleUpdate()}/> : ""}

        <div className="row newCards" style={{display: showInput ? 'flex' : 'none'}}>
            <CardStackInput submit={(cardStack) => submit(cardStack)} setShowInput={(value) => setShowInput(value)}/>
        </div>

        <div id="oldCards">
            {cardStacks.map(stack => (
                <CardStack key={stack.id} id={stack.id} name={stack.name} cards={stack.cards} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </div>
}