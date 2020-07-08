import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import ForgotPw from './auth/ForgotPw';
import ResetPw from './auth/ResetPw';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/auth/password/forgot' exact component={ForgotPw} />
        <Route path='/auth/password/reset/:token' exact component={ResetPw} />
        <Route path='/auth/activate/:token' exact component={Activate} />
        <PrivateRoute path='/private' exact component={Private} />
        <AdminRoute path='/admin' exact component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
