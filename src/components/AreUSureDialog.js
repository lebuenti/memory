import React from "react";

export default function AreUSureDialog(props) {
    return <>
        <div className="row">
            {props.message}
        </div>
        <div className="row">
            <div className="col">
                <button type="reset" className="buttonReset small button" onClick={() => props.onReset()}>
                    <i className="fas fa-times icon"/>
                </button>
                <button type="button" className="buttonSuccess small button" onClick={() => props.onSubmit()}>
                    <i className="fas fa-check icon"/>
                </button>
            </div>
        </div>
    </>
}