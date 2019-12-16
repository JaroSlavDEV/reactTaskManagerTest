import React, { Fragment, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const Application = ( {children} ) => {
    const {initializeApp} = useContext(FirebaseContext);

    useEffect(() => {
        initializeApp();
        //react-hooks/exhaustive-deps
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
