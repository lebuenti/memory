import React, {useEffect, useState} from "react";
import Subject from "./Subject";
import uuid from '../util/uuid';
import firebase from "../db/firebase";
import "../style/home.scss";

const initialColor = '#ff0000';
const collectionSubject = 'subject';

export default function Home(props) {
    const [subjects, setSubjects] = useState([]);
    const [subjectName, setSubjectName] = useState('');
    const [subjectColor, setSubjectColor] = useState(initialColor);
    const [showInput, setShowInput] = useState(false);

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

        firebase.firestore().collection(collectionSubject)
            .doc()
            .set({
                color: subjectColor,
                name: subjectName,
                user: firebase.auth().currentUser.uid
            }).then(() => {
            setSubjects(curr => [{id: uuid(), name: subjectName, color: subjectColor}, ...curr]);
        });
        handleReset();
    };

    const handleReset = () => {
        setShowInput(false);
        setSubjectColor(initialColor);
        setSubjectName('');
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
                    <h4>Create a new subject</h4>
                </div>
                <div className="col">
                    <label>
                        Name
                        <input type="text" value={subjectName} placeholder="Math"
                               onChange={e => setSubjectName(e.target.value)}/>
                    </label>
                </div>
                <div className="col">
                    <label>
                        Color
                        <input type="color" value={subjectColor}
                               onChange={e => setSubjectColor(e.target.value)}/>
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
            {subjects.map(subject => (
                <Subject key={subject.id} id={subject.id}  name={subject.name} color={subject.color} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </>
}