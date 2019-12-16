import React, { useState, useContext } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Login = () => {
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const alert = useContext(AlertContext);
    const { isAuthorized, login } = useContext(FirebaseContext);

    const submitHandler = event => {
        event.preventDefault();

        if(valueEmail && valuePassword) {
            login(valueEmail, valuePassword).then(() => {
                alert.show('Login was done', 'success');

            }).catch((e) => {
                alert.show(e.message, 'danger');
            });

        } else {
            alert.show('Enter email and password');
        }
    }
    
    if (isAuthorized) return <Redirect to={{ pathname: '/dashboard' }} />

    return (
        <div className="row justify-content-center align-items-center">
            <article className="card-body col-sm-4">
                <NavLink to="/signup" exact className="float-right btn btn-outline-primary">Sign up</NavLink>
                <h4 className="card-title mb-4 mt-1">Log in</h4>
                <hr />
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> 
                                    <FontAwesomeIcon icon={faUser} /> 
                                </span>
                            </div>
                            <input className="form-control" type="email" placeholder="Enter email" value={valueEmail} onChange={e => setValueEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> 
                                    <FontAwesomeIcon icon={faLock} /> 
                                </span>
                            </div>
                            <input className="form-control" type="password" placeholder="Enter password" value={valuePassword} onChange={e => setValuePassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </form>
            </article>
        </div>
    )
}
