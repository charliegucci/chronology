import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ResetPw = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset Password'
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Loading...' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then((response) => {
        console.log('RESET PW SUCCESS', response);
        toast(response.data.message);
        setValues({ ...values, buttonText: 'Submitted' });
      })
      .catch((error) => {
        console.log('FORGOT PW ERROR', error.response.data);
        toast(error.response.data.error);
        setValues({ ...values, buttonText: 'Reset Password' });
      });
  };

  const passwordResetForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Create New Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type='password'
          className='form-control'
          placeholder='Type new password min. 6 characters'
          required
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
        <ToastContainer position='bottom-right' />
        <h1 className='p-5 text-center'>
          Hello {name}, Enter you new password
        </h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default ResetPw;
