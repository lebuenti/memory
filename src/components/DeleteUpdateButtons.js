import React, {useState} from "react"
import AreUSureDialog from "./AreUSureDialog";

export default function DeleteUpdateButtons(props) {
    const [areUSureDialog, setAreUSureDialog] = useState(false);

    return <>
        <div className="row">
            <div className="col">
                <button className='buttonReset card button' onClick={() => setAreUSureDialog(!areUSureDialog)}>
                    <i className="fas fa-trash icon"/>
                </button>
            </div>
            <div className="col">
                <button className='buttonUpdate card button' onClick={() => {/*something happens*/
                }}>
                    <i className="fas fa-pen icon"/>
                </button>
            </div>
        </div>

        <div className="row" style={{display: areUSureDialog ? 'flex' : 'none'}}>
            <div className="col">
                <AreUSureDialog message={props.deleteMessage}
                                onReset={() => setAreUSureDialog(!areUSureDialog)} onSubmit={() => props.handleDelete()}/>
            </div>
        </div>

    </>
}