import React, { useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Note } from './Note'
import { AlertContext } from '../../context/alert/alertContext'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const Notes = ({ notes }) => {
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const removeHandler = id => {
        firebase.removeNote(id).then(() => {
            alert.show('Note was deleted', 'success');
        }).catch((e) => {
            alert.show(e.message, 'danger');
        });
    }

    const changeHandler = (id, title) => {
        firebase.changeNote(id, title).then(() => {
            alert.show('Note was changed', 'success');
        }).catch((e) => {
            alert.show(e.message, 'danger');
        });
    }

    const shareHandler = (title, receiver) => {
        firebase.shareNote(title, receiver).then(() => {
            alert.show('Note was shared', 'success');
        }).catch((e) => {
            alert.show(e.message, 'danger');
        });
    }

    return (
        <TransitionGroup component="ul" className="list-group">
            {notes.map(note => (
                <CSSTransition key={note.id} timeout={800} classNames={'note'}>
                    <Note note={note} removeHandler={removeHandler} changeHandler={changeHandler} shareHandler={shareHandler} />
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}
