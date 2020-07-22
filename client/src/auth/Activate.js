import React, { useState, useEffect } from 'react';
import Logo from '../core/Logo';

import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Navbar
} from 'reactstrap';
import Footer from '../core/Footer';

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    firstName: '',
    token: '',
    show: false,
    loading: false
  });

  useEffect(() => {
    let token = match.params.token;
    let { firstName } = jwt.decode(token);

    if (token) {
      setValues({ ...values, firstName, token });
    }
  }, []);

  const { firstName, token, show, loading } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
      .then((response) => {
        console.log('ACCOUNT ACTIVATION SUCCESS', response);
        setValues({
          ...values,
          show: true,
          loading: false
        });
        toast(response.data.message);
      })
      .catch((error) => {
        console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
        setValues({ ...values, loading: false });
        toast(error.response.data.error);
      });
  };
  const [firstFocus, setFirstFocus] = useState(false);
  useEffect(() => {
    document.body.classList.add('login-page');
    // document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
      // document.body.classList.remove('sidebar-collapse');
    };
  }, []);

  const activationLink = () => (
    <div className='text-center'>
      <h4>Hello {firstName} , Please activate your account</h4>
      {show ? (
        <Link to='/'>Back to Login</Link>
      ) : (
        <Button
          block
          className='btn-round'
          color='info'
          onClick={clickSubmit}
          size='sm'>
          {loading ? (
            <i className='now-ui-icons loader_gear spin'> </i>
          ) : (
            <span>Activate Account</span>
          )}
        </Button>
      )}
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
            <Row>{activationLink()}</Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Activate;
