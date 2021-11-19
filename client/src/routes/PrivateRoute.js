import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// if user is logged in, render the route's component. else redirect to login page
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('TOKEN');
  return (
    <Route {...rest} render={props => (
      !!token ?
        <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};

export default PrivateRoute;