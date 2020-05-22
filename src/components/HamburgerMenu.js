import React from "react"
import "../style/menu.scss"

export default function HamburgerMenu(props) {
    return <div className="col">
        <div className="hamburgerIcon" style={{color: props.iconColor}}>
            <i className="fas fa-bars settings"/>
        </div>
        <button className='roundedEdge'>
        </button>
    </div>
}