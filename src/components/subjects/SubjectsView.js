import React, {useEffect, useState} from "react";
import Subject from "./Subject";
import "../../style/home.scss";
import toast from "../../toast/toast";
import db from "../../db/db";
import SubjectInput from "./SubjectInput";

export default function SubjectsView(props) {
    const [subjects, setSubjects] = useState([]);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        db.getSubjects()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setSubjects(curr => [{id: doc.id, name: doc.data().name, color: doc.data().color}, ...curr]);
                });
            }).catch((error) => {
                toast.fail('Could not load subjects from database');
                console.error(error);
            }
        );
    }, []);

    const submit = (newSubject) => {
        return db.addSubject(newSubject.color, newSubject.name)
            .then((docSubject) => {
                setSubjects(curr => [{id: docSubject.id, name: newSubject.name, color: newSubject.color}, ...curr]);
            });
    };

    return <>
        <div className="row">
            <div className="col">
                <button className='add button' onClick={() => setShowInput(true)}>
                    <i className="fas fa-plus icon"/>
                </button>
            </div>
        </div>

        <div className="row formAdd" style={{display: showInput ? 'flex' : 'none'}}>
            <SubjectInput submit={(newSubject) => submit(newSubject)} setShowInput={(value) => setShowInput(value)}/>
        </div>

        <div id="subjects">
            {subjects.map(s => (
                <Subject key={s.id} id={s.id} name={s.name} color={s.color} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </>
}