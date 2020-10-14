import React, {useRef, useState} from "react";
import "./swipebutton.scss"

export default function SwipeButton(props) {
    const [isDropped, setIsDropped] = useState(false);
    const [startX, setStartX] = useState(undefined);
    const dragObj = useRef(null);
    const dragRow = useRef(null)
    const dropObj = useRef(null);

    const onDragStart = (event) => {
        setStartX(event.clientX);
        //remove ghost image
        let img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
    }

    const onDrop = () => {
        setIsDropped(true);
    }

    const onDrag = (event) => {
        dragObj.current.style.left = Math.max(0, event.clientX - startX) + "px";

        const end = dropObj.current.getBoundingClientRect().left;
        const W = end - event.clientX;
        const G = end - startX;
        const p100 = (1 - W / G) * 100;
        const gradientP = Math.max(0, Math.min(100, Math.floor(p100)));
        if (event.clientX >= end + 25) dragRow.current.style.backgroundColor = 'red';
        else dragRow.current.style.background = "linear-gradient(to right, red 0%, rgba(255, 0, 0, 0.5) " + gradientP + "%)";
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    return <div className="row danger" ref={dragRow}>
        <div className="col drag-object" ref={dragObj}>
            {isDropped ? '' :
                <div className={'buttonReset drag-button'} draggable="true" onDragStart={onDragStart} onDrag={onDrag}>
                    <i className="fas fa-trash icon"/>
                </div>}
        </div>
            <div className="col drag-label">
                <label>Swipe to delete subject</label>
            </div>
        <div className="col dropzone" ref={dropObj} onDragOver={onDragOver} onDrop={onDrop}>
            {isDropped ?
                <div className={'buttonReset drag-button'}>
                    <i className="fas fa-trash icon"/>
                </div> : ''}
        </div>
    </div>

}