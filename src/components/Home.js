import React, {useEffect, useState} from "react";
import Subject from "./Subject";
import uuid from './uuid';
import firebase from "./firebase";

const initialColor = '#ff0000';

export default function Home(props) {
    const [subjects, setSubjects] = useState([]);
    const [subjectName, setSubjectName] = useState('');
    const [subjectColor, setSubjectColor] = useState(initialColor);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        const db = firebase.firestore();

        //TODO read only from the logged in user.
        db.collection('subject').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setSubjects(curr => [{id: doc.id, name: doc.data().name, color: '#' + doc.data().color}, ...curr]);
            });
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubjects(curr => [{id: uuid(), name: subjectName, color: subjectColor}, ...curr]);
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
                <button className='add' onClick={() => {
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
                    <button type="reset" className="buttonReset" onClick={handleReset}>
                        <i className="fas fa-times icon"/>
                    </button>
                    <button type="submit" className="buttonSuccess">
                        <i className="fas fa-check icon"/>
                    </button>
                </div>
            </form>
        </div>

        <div id="subjects">
            {subjects.map(subject => (
                <Subject key={subject.id} name={subject.name} color={subject.color} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </>
}