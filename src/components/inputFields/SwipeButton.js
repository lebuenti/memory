import React, {useEffect, useRef, useState} from "react";
import "./swipebutton.scss"

export default function SwipeButton(props) {
    const [startX, setStartX] = useState(undefined);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        let tmp = onMouseUp;
        document.addEventListener('mouseup', tmp);
        return () => {
            document.removeEventListener('mouseup', tmp);
        }
    }, [])

    const onMouseDown = e => {
        setIsDragging(true)
        setStartX(e.clientX);
        document.addEventListener('mousemove', onMouseMove);
    }

    const onMouseUp = () => {
        console.log("mouse up")
        document.removeEventListener('mousemove', onMouseMove);
    }

    const onMouseMove = e => {
        console.log('isMouseMoving');
        console.log('startX', startX);
        console.log({isDragging})
    }

    const onDragEnd = e =>{
        e.preventDefault();
        onMouseUp();
    }


    return <div className="row danger">
        <div className="col">
            <div className={'buttonReset btn'} draggable="true" onMouseDown={onMouseDown} onDragEnd={onDragEnd}>
                {/*<div className={'buttonReset btn'} draggable="true" onDragStart={onDragStart}>*/}
                <i className="fas fa-trash icon"/>\
            </div>
            {/*onSuccess={() => props.onClick()}*/}

        </div>
        <div className="col">
            <label>Swipe to delete subject</label>
        </div>
        {/*<div className="col dropzone" onDrop={onDrop}>*/}
        {/*</div>*/}
    </div>

}