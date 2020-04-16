import React from "react";

export default function Footer(props) {
    return <footer className="footer">
        <div className="row">
            <div className="col">
                <button onClick={() => props.nextPage("subjectsView")}>
                    <i className="fas fa-home icon"/>
                </button>
            </div>
            <div className="col">
                <button onClick={() => props.nextPage("learning")}>
                    <i className="fas fa-graduation-cap icon"/>
                </button>
            </div>
            <div className="col">
                <button onClick={() => props.nextPage("profile")}>
                    <i className="fas fa-user icon"/>
                </button>
            </div>
        </div>
    </footer>
}