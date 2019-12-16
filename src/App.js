import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Application } from './components/container/Application'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Navbar } from './components/presentation/Navbar'
import { Alert } from './components/presentation/Alert'
import { PrivateRoute } from './components/container/PrivateRoute'
import { AlertState } from './context/alert/AlertState'
import { FirebaseState } from './context/firebase/FirebaseState'

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <BrowserRouter>
          <Application>
            <Navbar />
            <div className="container pt-4">
              <Alert />
              <Switch>
                <Route path={'/'}  exact component={Home} />
                <PrivateRoute path={'/dashboard'} exact component={Dashboard} />
                <Route path={'/login'} exact component={Login} />
                <Route path={'/signup'} exact component={Signup} /> 
                <Redirect to={'/'} />
              </Switch>
            </div>
          </Application>
        </BrowserRouter>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
