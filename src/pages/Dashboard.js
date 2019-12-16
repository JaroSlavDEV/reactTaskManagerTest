import React, {Fragment, useContext, useEffect} from 'react'
import { Form } from '../components/presentation/Form'
import { Notes } from '../components/presentation/Notes'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { Loader } from '../components/presentation/Loader'

export const Dashboard = () => {
    const {loading, notes, fetchNotes, removeNote} = useContext(FirebaseContext);

    useEffect(() => {
        fetchNotes();
        //react-hooks/exhaustive-deps
        //eslint-disable-next-line
    }, []);
    
    return(
        <Fragment>
            <Form />

            <hr/>

            {loading
                ? <Loader />
                : <Notes notes={notes} onRemove={removeNote} />
            }
        </Fragment>
    )
}
