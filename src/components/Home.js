import React, {useEffect, useState} from "react";
import Subject from "./Subject";
import uuid from '../util/uuid';
import firebase from "../db/firebase";
import "../style/home.scss";
import toast from "../toast/toast";

const initialColor = '#ff0000';
const collectionSubject = 'subject';

export default function Home(props) {
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState({name: '', color: initialColor});
    const [showInput, setShowInput] = useState(false);
    const [inputError, setInputError] = useState({subjectName: false});

    useEffect(() => {
        firebase.firestore().collection(collectionSubject)
            .where('user', '==', firebase.auth().currentUser.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setSubjects(curr => [{id: doc.id, name: doc.data().name, color: doc.data().color}, ...curr]);
                });
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            subjectName: subject.name.length === 0
        });

        if (subject.name.length === 0) {
            toast.fail("Subjectname ist empty");
            return;
        }

        firebase.firestore().collection(collectionSubject)
            .doc()
            .set({
                color: subject.color,
                name: subject.name,
                user: firebase.auth().currentUser.uid
            }).then(() => {
            setSubjects(curr => [{id: uuid(), name: subject.name, color: subject.color}, ...curr]);
        });
        handleReset();
    };

    const handleReset = () => {
        setShowInput(false);
        setInputError({subjectName: false});
        setSubject({name: '', color: initialColor});
    };

    return <>
        <div className="row">
            <div className="col">
                <button className='add button' onClick={() => {
                    setShowInput(true);
                }}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
        </div>

        <div className="row formAdd" style={{display: showInput ? 'flex' : 'none'}}>
            <form onSubmit={handleSubmit}>
                <div className="col">
                    <h3>New subject</h3>
                </div>
                <div className="col">
                    <label>
                        Name
                        <input className={(inputError.subjectName ? 'inputError' : '')}
                               type="text" value={subject.name} placeholder="Math"
                               onChange={e => setSubject({...subject, name: e.target.value})}/>
                    </label>
                </div>
                <div className="col">
                    <label>
                        Color
                        <input type="color" value={subject.color}
                               onChange={e => setSubject({...subject, color: e.target.value})}/>
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

        <div id="subjects">
            {subjects.map(s => (
                <Subject key={s.id} id={s.id}  name={s.name} color={s.color} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </>
}