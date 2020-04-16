import React, {useEffect, useState} from "react";
import db from "../../db/db"

export default function Profile(props) {
    const [email, setEmail] = useState('');

    useEffect(() => {
        db.getCurrentUser().then((user) => {
            if (user) setEmail(user.email);
        })
    }, []);

    const handleSubmit = () => {
        db.logout().then(() => {
            history.pushState({}, '', '/');
            props.logout();
        }).catch((error) => {
                toast.fail('Could not log out');
                console.error(error)
            }
        );
    };

    return <div>
        <div className="row">{email}</div>
        <div className="row">
            <button type="submit" onClick={handleSubmit} className="button buttonReset">
                <i className="fas fa-sign-out-alt icon"/> Logout
            </button>
        </div>
    </div>;
}