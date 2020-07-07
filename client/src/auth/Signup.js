import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Loading...' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then((response) => {
        console.log('SIGNUP SUCCESS', response);
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          buttonText: 'Done'
        });
        toast(response.data.message);
      })
      .catch((error) => {
        console.log('SIGNUP ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          value={name}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>
      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer position='top-center' />
        {isAuth() ? <Redirect to='/' /> : null}
        <h1 className='p-5 text-center'>Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
