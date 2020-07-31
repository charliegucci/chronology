import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Profile from './core/Profile';
import Level1Route from './auth/Level1Route';
import ForgotPw from './auth/ForgotPw';
import ResetPw from './auth/ResetPw';
import TimeSheet from './core/TimeSheet';
import Chart from './core/Chart';
import ErrorPage from './core/ErrorPage';
// all the Routes for the client
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
        <Level1Route path='/user/chart' exact component={Chart} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
