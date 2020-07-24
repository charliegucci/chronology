import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Level1 from './core/Level1';
import Level2 from './core/Level2';
import Level1Route from './auth/Level1Route';
import Level2Route from './auth/Level2Route';
import ForgotPw from './auth/ForgotPw';
import ResetPw from './auth/ResetPw';
import Level1TimeSheet from './core/Level1TimeSheet';

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
        <Level1Route path='/level1' exact component={Level1} />
        <Level1Route
          path='/level1/timesheet'
          exact
          component={Level1TimeSheet}
        />
        <Level2Route path='/level2' exact component={Level2} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
