import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuth } from './helpers';
import Logo from '../core/Logo';
import jwt from 'jsonwebtoken';
import axios from 'axios';
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

const ResetPw = ({ match }) => {
  const [values, setValues] = useState({
    firstName: '',
    token: '',
    newPassword: '',
    success: false,
    loading: false
  });
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

  useEffect(() => {
    let token = match.params.token;
    let { firstName } = jwt.decode(token);
    if (token) {
      setValues({ ...values, firstName, token });
    }
  }, []);

  const { firstName, token, newPassword, success, loading } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then((response) => {
        console.log('RESET PW SUCCESS', response);
        setValues({ ...values, success: true, loading: false });
        toast(response.data.message);
      })
      .catch((error) => {
        console.log('FORGOT PW ERROR', error.response.data);
        setValues({ ...values, loading: false });
        toast(error.response.data.error);
      });
  };

  return (
    <>
      <ToastContainer position='bottom-right' />
      {isAuth() ? <Redirect to='/profile' /> : null}
      <div className='page-header header-filter'>
        <div
          className='page-header-image'
          style={{
            backgroundColor: '#1E1D2D'
          }}></div>
        <div className='content'>
          <Container>
            <Logo />
            <Row>
              <Col className='ml-auto mr-auto' md='5'>
                <Card
                  className='card-login card-plain'
                  style={{ backgroundColor: '#14131d', padding: '1.5rem' }}>
                  <Form action='' className='form' method=''>
                    <CardHeader className='text-center'></CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (firstFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons objects_key-25'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Enter new password here...'
                          type='password'
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleChange}
                          value={newPassword}></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      {success ? (
                        <Link to='/'>Back to Login</Link>
                      ) : (
                        <Button
                          block
                          className='btn-round'
                          color='info'
                          onClick={clickSubmit}
                          size='lg'>
                          {loading ? (
                            <i className='now-ui-icons loader_gear spin'> </i>
                          ) : (
                            <span>Change Password</span>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ResetPw;
