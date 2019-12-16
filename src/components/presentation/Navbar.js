import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const Navbar = () => {
    const { isAuthorized, logout } = useContext(FirebaseContext);

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary d-flex justify-content-between">
            <div className="navbar-brand">
                Task Manager
        </div>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" exact className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/dashboard" exact className="nav-link">
                        Dashboard
                    </NavLink>
                </li>

                {isAuthorized
                    ? 
                    (<Fragment>
                        <li className="nav-item">
                            <NavLink to="/" exact onClick={logout} className="nav-link disable-active">
                                Logout
                            </NavLink>
                        </li>
                    </Fragment>)
                    :
                    (<Fragment>
                        <li className="nav-item">
                            <NavLink to="/login" exact className="nav-link">
                                Login
                            </NavLink>
                        </li>
                    </Fragment>
                    )
                }
            </ul>
        </nav>
    )
}
