import React, {useState} from "react";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleReset = () => {
        /*setShowInput(false);
        setCardName('');*/
    };

    return <div className="row formAdd">
        <form onSubmit={handleSubmit}>
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
            <div className="col">
                <h5>Register</h5>
            </div>
            <div className="col">
                <label>
                    <input type="text" value={username} placeholder="Username"
                           onChange={e => setUsername(e.target.value)}/>
                </label>
            </div>
            <div className="col">
                <label>
                    <input type="text" value={email} placeholder="Email"
                           onChange={e => setEmail(e.target.value)}/>
                </label>
            </div>
            <div className="col">
                <label>
                    <input type="password" value={password} placeholder="password"
                           onChange={e => setPassword(e.target.value)}/>
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
}