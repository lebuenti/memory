import React, {useState} from "react";
import toast from "../../toast/toast";
import db from "../../db/db";

export default function Register(props) {
    const [user, setUser] = useState({email: '', password: ''});
    const [inputError, setInputError] = useState({email: false, password: false});

    const handleSubmit = (event) => {
        event.preventDefault();

        setInputError({
            email: user.email.length === 0,
            password: user.password.length === 0
        });

        if (user.email.length === 0 || user.password.length === 0) {
            if (user.email.length === 0) toast.fail('Email is empty');
            if (user.password.length === 0) toast.fail('Password ist empty');
            return;
        }

        db.createUser(user.email, user.password)
            .then(() => {
                toast.success('Account was created');
                db.login(user.email, user.password)
                    .then(() => {
                        props.login();
                    }).catch((error) => {
                        console.error(error.message);
                        toast.fail('Could not logged in. Pls try to login with your new account again.');
                        history.pushState({}, '', '/');
                    }
                );
            }).catch((error) => {
                toast.fail(error.message);
                if (error.message.includes('email') || error.message.includes('user')) setInputError({...inputError, email: true});
                if (error.message.includes('assword')) setInputError({...inputError, password: true});
            }
        );
    };

    const handleReset = () => {
        setUser({email: '', password: ''});
        setInputError({email: false, password: false});
    };

    return <div>
        <div className="row">
            <div className="col" id="headerLogin">
                <h1>memory</h1>
            </div>
        </div>
        <div className="row formAdd">
            <form onSubmit={handleSubmit}>

                <div className="col">
                    <h2>Register</h2>
                </div>
                <div className="col">
                    <label>
                        Email
                        <input className={(inputError.email ? 'inputError' : '')} type="text" value={user.email}
                               onChange={e => setUser({...user, email: e.target.value})}/>
                    </label>
                </div>
                <div className="col">
                    <label>
                        Password
                        <input className={(inputError.password ? 'inputError' : '')} type="password" value={user.password}
                               onChange={e => setUser({...user, password: e.target.value})}/>
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
    </div>
}