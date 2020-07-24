import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';

const Level2Route = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === 'Level2' ? (
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

export default Level2Route;
