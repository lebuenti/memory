import React from "react"
import "./menu.scss"

export default function UpdateMenu(props) {
    return <>
        <div id={"updateMenu"}/>
        <div id={"updateMenuWithIcon"} style={{color: props.iconColor}} onClick={() => props.onClick()}>
            <div className="row">
                <i className="fas fa-pencil-alt settings fa-flip-horizontal"/>
            </div>
        </div>
    </>
}