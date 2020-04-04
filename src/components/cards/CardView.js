import React, {useEffect, useState} from "react";
import "../../style/cardview.scss";

export default function CardView() {
    const [subjectId, setSubjectId] = useState('');
    const [subjectColor, setSubjectColor] = useState('mathe');
    const [cardStackname, setCardstackname] = useState('binomische formeln');

    useEffect(() => {
        //substring
        //if not undefined
        setSubjectId(location.pathname);

        //read cards with this id
        //background with this color??

    });

    return <div id="cardview">
        <div className="row">
            <div className="col">
                <h3>{cardStackname}</h3>
            </div>
        </div>
        <div className="row oldCards">

            <div className="cards">

                <div className="row">
                    <div className="card cardFront">Frage</div>
                </div>
                <div className="row">
                    <button className="switch button">
                        <i className="fas fa-redo icon"/>
                    </button>
                </div>

                <div className="row">
                    <div className="card cardFront">Frage</div>
                </div>
                <div className="row">
                    <button className="switch button">
                        <i className="fas fa-redo icon"/>
                    </button>
                </div>

            </div>
        </div>
    </div>

}