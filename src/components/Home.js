import React, {useState} from "react";
import Subject from "./Subject";
import uuid from './uuid';

export default function Home() {
    const [subjects, setSubjects] = useState([]);

    const addSubject = () => {
        setSubjects(curr => [...curr, {id: uuid(), name: "math"}]);
    };

    return <>
        <div className="row">
            <div className="col">
                <button className='add' onClick={addSubject}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
        </div>
        <div id="subjects">
            {subjects.map(subject => (
                <Subject key={subject.id} name={subject.name}/>
            ))}
        </div>
    </>
}