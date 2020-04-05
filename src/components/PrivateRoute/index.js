import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { isAuth } from '../../_helpers/auth'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isValid = isAuth();

    return (
        <Route {...rest} render={props => (
            isValid
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )} />
    )
}
