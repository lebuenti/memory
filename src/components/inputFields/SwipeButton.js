import React, {useRef, useState} from "react";
import "./swipebutton.scss"

export default function SwipeButton(props) {
    const [isDropped, setIsDropped] = useState(false);
    const [startX, setStartX] = useState(undefined);
    const dragObj = useRef(null);
    const dragRow = useRef(null)
    const dropObj = useRef(null);
    const initialLeftStyleValue = -10;

    const onDragStart = (event) => {
        if (window.mobileCheck()) {
            setStartX(event.touches[0].clientX);
        } else {
            setStartX(event.clientX);
            removeDragDropGhostImage(event);
        }
    }

    const removeDragDropGhostImage = (event) => {
        let img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
    }

    const onDrop = () => {
        setIsDropped(true);
        props.onSuccess();
    }

    const onDrag = (event) => {
        let clientX = (window.mobileCheck() ? event.touches[0].clientX : event.clientX);

        dragObj.current.style.left = Math.max(initialLeftStyleValue, clientX - startX) + "px";
        const end = dropObj.current.getBoundingClientRect().left;
        const W = end - clientX;
        const G = end - startX;
        const p100 = (1 - W / G) * 100;
        const gradientP = Math.max(0, Math.min(100, Math.floor(p100)));
        if (clientX >= end + 25) dragRow.current.style.backgroundColor = 'red';
        else dragRow.current.style.background = "linear-gradient(to right, red 0%, rgba(255, 0, 0, 0.5) " + gradientP + "%)";
    }

    const onTouchEnd = () => {
        const end = dropObj.current.getBoundingClientRect().left;
        const current = dragObj.current.getBoundingClientRect().left;
        if (current >= end) {
            onDrop();
        } else {
            dragObj.current.style.left = initialLeftStyleValue + "px";
            dragRow.current.style.background = "linear-gradient(to right, red 0%, rgba(255, 0, 0, 0.5) 0%)";
        }
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    return <div className="row danger" ref={dragRow}>
        <div className="col drag-object" ref={dragObj}>
            {isDropped ? '' :
                <div className={'buttonReset drag-button'} draggable="true"
                     onDragStart={onDragStart} onDrag={onDrag} onTouchStart={onDragStart} onTouchMove={onDrag}
                     onTouchEnd={onTouchEnd}>
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