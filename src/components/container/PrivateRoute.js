import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const {isAuthorized} = useContext(FirebaseContext);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthorized
                    ? (<Component {...props} />)
                    : (<Redirect to={{ pathname: '/login', state: {from: props.location} }} />)
            }
        />
    )
}
