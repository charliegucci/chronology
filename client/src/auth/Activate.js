import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button, Container, Row } from 'reactstrap';
import Footer from '../core/Footer';

// Activate Account Component
const Activate = ({ match }) => {
  // sets the state
  const [values, setValues] = useState({
    firstName: '',
    token: '',
    show: false,
    loading: false
  });

  // Grabs the token from params when mount and jwt to decode and save values to state
  useEffect(() => {
    let token = match.params.token;
    let { firstName } = jwt.decode(token);

    if (token) {
      setValues({ ...values, firstName, token });
    }
  }, []);

  const { firstName, token, show, loading } = values;

  // Function to Post the token to the backend to be decoded by JWT
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
      .then((response) => {
        setValues({
          ...values,
          show: true,
          loading: false
        });
        toast(response.data.message);
      })
      .catch((error) => {
        setValues({ ...values, loading: false });
        toast(error.response.data.error);
      });
  };

  useEffect(() => {
    document.body.classList.add('login-page');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
    };
  }, []);

  const activationLink = () => (
    <div className='text-center'>
      <h4>
        Hello {firstName} , Please Click the Button Below to Activate Account
      </h4>

      <Button
        block
        className='btn-round'
        color='info'
        onClick={clickSubmit}
        size='sm'>
        {loading ? (
          <i className='now-ui-icons loader_gear spin'> </i>
        ) : (
          <span>Click Here</span>
        )}
      </Button>
    </div>
  );

  const backToLogin = () => (
    <div className='text-center'>
      <h4>Hello {firstName} , Please Log in and start editing your profile</h4>
      <Link to='/'>Back to Login</Link>
    </div>
  );

  return (
    <>
      <ToastContainer position='bottom-right' />
      <div className='page-header header-filter'>
        <div
          className='page-header-image'
          style={{
            backgroundColor: '#1E1D2D'
          }}></div>

        <div className='content-center' style={{ width: '20rem' }}>
          <Container>
            {show ? <Row>{backToLogin()}</Row> : <Row>{activationLink()}</Row>}
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Activate;
