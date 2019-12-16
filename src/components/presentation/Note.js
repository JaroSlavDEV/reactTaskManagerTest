import React, { useState } from 'react'

export const Note = ({ note, removeHandler, changeHandler, shareHandler }) => {
    const [changedMode, toogleChangedMode] = useState(false);
    const [valueTitle, setValueTitle] = useState(note.title);
    const [valueReceiver, setValueReceiver] = useState('');

    const saveTitle = () => {
        if(note.title !== valueTitle) changeHandler(note.id, valueTitle);
        toogleChangedMode(false);
    }

    const shareTitle = () => {
        shareHandler(note.title, valueReceiver);
        setValueReceiver('');
    }

    return (
        <li className="list-group-item note" key={note.id}>
            <div className="d-flex align-items-center flex-grow-1">
                {   
                    changedMode 
                    ? (<input type="text" className="form-control form-control-sm w-25" placeholder="Enter note" value={valueTitle} onChange={e => setValueTitle(e.target.value)} />)
                    : (<strong>{note.title}</strong>) 
                }   
                <small>{note.date}</small>
                <small className="text-primary">{note.sender ? `(Shared by ${note.sender})` : ''}</small>
            </div>
            <div className="d-flex justify-content-end">
                <input className="form-control form-control-sm mr-3" type="email" placeholder="Enter receive" value={valueReceiver} onChange={e => setValueReceiver(e.target.value)} />
                <button type="submit" onClick={shareTitle} className="btn btn-outline-primary btn-sm mr-5">
                    Share
                </button>

                {   
                    changedMode 
                    ? 
                    <button onClick={saveTitle} className="btn btn-outline-primary btn-sm mr-3">
                        Save
                    </button>
                    :
                    <button onClick={() => toogleChangedMode(true)} className="btn btn-outline-primary btn-sm mr-3">
                        Change
                    </button>
                }   

                <button onClick={() => removeHandler(note.id)} className="btn btn-outline-danger btn-sm">
                    &times;
                </button>
            </div>

        </li>
    )
}
