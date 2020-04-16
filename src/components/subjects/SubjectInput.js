import React, {useState} from "react"
import toast from "../../toast/toast";

const initialColor = '#ff0000';

export default function SubjectInput(props) {
    const [subject, setSubject] = useState({name: '', color: initialColor});
    const [inputError, setInputError] = useState({subjectName: false});

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            subjectName: subject.name.length === 0
        });
        if (subject.name.length === 0) {
            toast.fail("Subject name ist empty");
            return;
        }
        props.submit(subject).catch((error) => {
            toast.fail('Could not save subject into database');
            console.error(error);
        });

        handleReset();
    };

    const handleReset = () => {
        props.setShowInput(false);
        setInputError({subjectName: false});
        setSubject({name: '', color: initialColor});
    };

    return <form onSubmit={handleSubmit}>
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
}