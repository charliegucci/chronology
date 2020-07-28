import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Profile from './core/Profile';
import Admin from './core/Admin';
import Level1Route from './auth/Level1Route';
import Level2Route from './auth/Level2Route';
import ForgotPw from './auth/ForgotPw';
import ResetPw from './auth/ResetPw';
import TimeSheet from './core/TimeSheet';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/auth/password/forgot' exact component={ForgotPw} />
        <Route path='/auth/password/reset/:token' exact component={ResetPw} />
        <Route path='/auth/activate/:token' exact component={Activate} />
        <Level1Route path='/profile' exact component={Profile} />
        <Level1Route path='/user/timesheet' exact component={TimeSheet} />
        {/* <Level2Route path='/admin' exact component={Admin} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
