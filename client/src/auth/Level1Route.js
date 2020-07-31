import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';

// Protected Routes for Level 1
const Level1Route = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }></Route>
);

export default Level1Route;
