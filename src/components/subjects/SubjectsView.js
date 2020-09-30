import React, {useEffect, useState} from "react";
import Subject from "./Subject";
import "./subjectView.scss";
import toast from "../../util/toast";
import db from "../../db/db";
import SubjectInput from "./SubjectInput";
import loading from "../../util/loading";

export default function SubjectsView(props) {
    const [subjects, setSubjects] = useState([]);
    const [showInput, setShowInput] = useState(undefined);

    useEffect(() => {
        loading();
        db.getSubjects()
            .then((querySnapshot) => {
                let sorted = querySnapshot.docs.sort((a, b) => {
                    if (a.data().timestamp > b.data().timestamp) return 1;
                    else if (a.data().timestamp < b.data().timestamp) return -1;
                    return 0;
                });
                sorted.forEach((doc) => {
                    setSubjects(curr => [{id: doc.id, name: doc.data().name, color: doc.data().color}, ...curr]);
                });
            }).catch((error) => {
            toast.fail(error);
            console.error(error);
        }).finally(() => loading.stop());
    }, []);

    const submit = (newSubject) => {
        loading();
        return db.addSubject(newSubject.color, newSubject.name)
            .then((doc) => {
                setSubjects(curr => [{id: doc.id, name: newSubject.name, color: newSubject.color}, ...curr]);
            }).catch((error) => console.error(error))
            .finally(() => loading.stop());
    };

    return <>
        <div className="row">
            <div className="col">
                <button className={'buttonSuccess button ' +
                (showInput === undefined ? "visible" : (showInput ? "green-to-red-transition invisible" : "red-to-green-transition visible"))}
                        onClick={() => setShowInput(!showInput)}>
                    <i className="fas fa-plus icon"/>
                </button>

                <button className={'buttonReset button ' + (showInput ? "visible" : "invisible")}
                        onClick={() => setShowInput(!showInput)}>
                    <i className="fas fa-times icon"/>
                </button>

            </div>
            <div className="col">
                <h2>New Subject</h2>
            </div>
        </div>

        <div className={showInput ? "visible" : "invisible"}>
            <SubjectInput submit={(newSubject) => submit(newSubject)} setShowInput={(value) => setShowInput(value)}/>
        </div>

        <div id="subjects">
            {subjects.map(s => (
                <Subject key={s.id} id={s.id} name={s.name} color={s.color} goTo={(value) => props.goTo(value)}/>
            ))}
        </div>
    </>
}