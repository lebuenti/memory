import React from "react"
import "./menu.scss"

export default function HamburgerMenu(props) {
    return <div className="col">
        <div className="hamburgerIcon" style={{color: props.iconColor}} onClick={() => props.onClick()}>
            <i className="fas fa-bars settings"/>
        </div>
        <button className='roundedEdge' onClick={() => props.onClick()}>
        </button>
    </div>
}