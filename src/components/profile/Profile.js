import React, {useEffect, useState} from "react";
import db from "../../db/db"
import loading from "../../util/loading";

export default function Profile(props) {
    const [email, setEmail] = useState('');

    useEffect(() => {
        loading();
        db.getCurrentUser().then((user) => {
            if (user) setEmail(user.email);
        }).catch((error) => console.error(error))
            .finally(() => loading.stop());
    }, []);

    const handleSubmit = () => {
        loading();
        db.logout().then(() => {
            history.pushState({}, '', '/');
            props.logout();
        }).catch((error) => {
            toast.fail('Could not log out');
            console.error(error)
        }).finally(() => loading.stop());
    };

    return <div>
        <div className="row">{email}</div>
        <div className="row">
            <button type="submit" onClick={handleSubmit} className="button buttonReset">
                <i className="fas fa-sign-out-alt icon"/>
            </button>
        </div>
    </div>;
}