import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      <Component {...props} />
    )} />
)

export default PublicRoute
