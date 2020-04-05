import React from 'react';

import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";

import { PrivateRoute } from './components/PrivateRoute';

import Layout from './pages/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';


const App = () => {
    const history = createBrowserHistory();

    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/forgot_password" component={ForgotPassword} />
                    <PrivateRoute path="/" component={Layout} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
