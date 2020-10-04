import React from "react"
import "./menu.scss"

export default function UpdateMenu(props) {
    return <div className="col">
        <div className="hamburgerIcon" style={{color: props.iconColor}} onClick={() => props.onClick()}>
            <i className="fas fa-pencil-alt settings fa-flip-horizontal"/>
        </div>
        <button className='roundedEdge' onClick={() => props.onClick()}>
        </button>
    </div>
}