import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        reactLocalStorage.get('userRealestate')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/prijava'}} />
    )} />
)

export default PrivateRoute
