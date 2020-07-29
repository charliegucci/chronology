import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../core/Logo';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/scss/now-ui-kit.scss';
import Footer from '../core/Footer';
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

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    employeeId: '',
    password: '',
    loading: false
  });

  const { employeeId, password, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { employeeId, password }
    })
      .then((response) => {
        console.log('SIGNIN SUCCESS', response);
        authenticate(response, () => {
          setValues({
            ...values,
            employeeId: '',
            password: '',
            loading: false
          });
          console.log(isAuth().role);
          toast(`Hello ${response.data.user.firstName}, Welcome back!`);
          isAuth() ? history.push('/profile') : history.push('/');
        });
      })
      .catch((error) => {
        setValues({ ...values, loading: false });
        console.log('SIGNIN ERROR', error);
        toast(error.response.data.error);
      });
  };

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

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
                  className='card-login card-plain '
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
                            <i className='now-ui-icons business_badge'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Employee Id'
                          type='text'
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleChange('employeeId')}
                          value={employeeId}></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (lastFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons objects_key-25'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Password'
                          type='password'
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handleChange('password')}
                          value={password}></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      <Button
                        block
                        className='btn-round'
                        color='info'
                        onClick={clickSubmit}
                        size='lg'>
                        {loading ? (
                          <i className='now-ui-icons loader_gear spin'></i>
                        ) : (
                          <span>Log in</span>
                        )}
                      </Button>
                    </CardFooter>
                    <div className='pull-left'>
                      <h6>
                        <Link to='/signup'>Create Account</Link>
                      </h6>
                    </div>
                    <div className='pull-right'>
                      <h6>
                        <Link to='/auth/password/forgot'>Forgot Password?</Link>
                      </h6>
                    </div>
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

export default Signin;
