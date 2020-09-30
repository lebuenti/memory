import React, {useState} from "react"
import toast from "../../util/toast";
import ColorPicker from "../inputFields/ColorPicker";

export default function SubjectInput(props) {
    const [subject, setSubject] = useState({name: '', color: ''});
    const [inputError, setInputError] = useState({name: false, color: false});

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            color: subject.color.length === 0,
            name: subject.name.length === 0
        });
        if (subject.name.length === 0) {
            toast.fail("Subject name ist empty");
            return;
        }
        if (subject.color.length === 0) {
            toast.fail("Subject color ist empty");
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
        setInputError({name: false, color: false});
        setSubject({name: '', color: ''});
    };

    return <form onSubmit={handleSubmit}>
        <div className="row">
            <label>Name</label>
        </div>
        <div className="row">
            <input className={(inputError.name ? 'inputError' : '')}
                   type="text" value={subject.name} placeholder="Math"
                   onChange={e => setSubject({...subject, name: e.target.value})}/>
        </div>
        <div className="row">
            <label>Color</label>
        </div>
        <ColorPicker onColorClicked={(color) => setSubject({...subject, color: color})}/>
        <div className="row center more-space">
            <div className="col">
                <button type="reset" className="buttonReset button" onClick={handleReset}>
                    <i className="fas fa-times icon"/>
                </button>
            </div>
            <div className="col">
                <button type="submit" className="buttonSuccess button">
                    <i className="fas fa-check icon"/>
                </button>
            </div>
        </div>
    </form>
}