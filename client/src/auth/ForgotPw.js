import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../core/Logo';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/scss/now-ui-kit.scss';
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
  Row
} from 'reactstrap';
import Footer from '../core/Footer';

// Forgot PW component
const ForgotPw = ({ history }) => {
  // sets the state
  const [values, setValues] = useState({
    workEmail: '',
    success: false,
    loading: false
  });

  const { workEmail, success, loading } = values;

  // sets the state dynamically
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, success: false });
  };

  // Function request backend to verify if email exist to reset the password
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { workEmail }
    })
      .then((response) => {
        toast(response.data.message);
        setValues({ ...values, success: true, workEmail: '', loading: false });
      })
      .catch((error) => {
        toast(error.response.data.error);
        setValues({ ...values, loading: false });
      });
  };

  // sets state for styling
  const [firstFocus, setFirstFocus] = useState(false);
  useEffect(() => {
    document.body.classList.add('login-page');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
    };
  }, []);

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
            <Row>
              <Col className='ml-auto mr-auto' md='5'>
                <Card
                  className='card-login card-plain'
                  style={{ backgroundColor: '#14131d', padding: '1.5rem' }}>
                  <Form action='' className='form' method=''>
                    <CardHeader className='text-center'>
                      <Logo />
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (firstFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_email-85'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Work Email'
                          type='email'
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleChange('workEmail')}
                          value={workEmail}></Input>
                      </InputGroup>
                    </CardBody>
                    {success ? (
                      <Link style={{ color: '#D55209' }} to='/'>
                        Back to Login
                      </Link>
                    ) : (
                      <CardFooter className='text-center'>
                        <Button
                          block
                          className='btn-round'
                          color='info'
                          onClick={clickSubmit}
                          size='lg'>
                          {loading ? (
                            <i className='now-ui-icons loader_gear spin'> </i>
                          ) : (
                            <span>Reset Password</span>
                          )}
                        </Button>
                        <div className='pull-left'>
                          <h6>
                            <Link to='/signup'>Create Account</Link>
                          </h6>
                        </div>
                        <div className='pull-right'>
                          <h6>
                            <Link to='/signin'>Already Registered?</Link>
                          </h6>
                        </div>
                      </CardFooter>
                    )}
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

export default ForgotPw;
