import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Update'
  });
  const { role, name, email, password, buttonText } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('PROFILE UPDATE', response);
        const { role, name, email } = response.data;
        setValues({
          ...values,
          role,
          name,
          email
        });
      })
      .catch((error) => {
        console.log('PROFILE UPDATE ERROR', error);
        if (error.response.status === 401) {
          signout(() => {
            history.pushState('/');
          });
        }
      });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Loading...' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/admin/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      .then((response) => {
        console.log('UPDATE SUCCESS', response);
        updateUser(response, () => {
          setValues({ ...values, buttonText: 'Done' });
          toast('Profile Updated Successfully');
        });
      })
      .catch((error) => {
        console.log('UPDATE ERROR', error.response.data.error);
        setValues({ ...values, buttonText: 'Update' });
        toast(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input
          type='text'
          defaultValue={role}
          className='form-control'
          disabled
        />
      </div>
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
          defaultValue={email}
          type='email'
          className='form-control'
          disabled
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
        <ToastContainer position='bottom-right' />

        <h1 className='pt-5 text-center'>Admin</h1>
        <p className='lead text-center'>Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Admin;
