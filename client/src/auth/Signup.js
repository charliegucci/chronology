import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import Logo from '../core/Logo';
import axios from 'axios';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/scss/now-ui-kit.scss';
// reactstrap components
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

// core components
// import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import Footer from '../core/Footer';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
    // buttonText: 'Submit'
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
  const [firstFocus, setFirstFocus] = useState(false);
  const [secondFocus, setSecondFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [navbarColor, setNavbarColor] = useState(' navbar-transparent');
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

  return (
    <>
      <ToastContainer position='bottom-right' />
      {isAuth() ? <Redirect to='/private' /> : null}

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
                <Card className='card-login card-plain'>
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
                            <i className='now-ui-icons users_single-02'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Full Name'
                          type='text'
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleChange('name')}
                          value={name}></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (secondFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_email-85'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Email'
                          type='email'
                          onFocus={() => setSecondFocus(true)}
                          onBlur={() => setSecondFocus(false)}
                          onChange={handleChange('email')}
                          value={email}></Input>
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
                        Register
                      </Button>
                    </CardFooter>
                    <div className='pull-left'>
                      <h6>
                        <Link to='/signin'>Already Registered?</Link>
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

export default Signup;
