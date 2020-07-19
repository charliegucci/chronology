import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import Logo from '../core/Logo';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import '../assets/css/bootstrap.min.css';
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

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    employeeId: '',
    password: ''
  });

  const { employeeId, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
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
            password: ''
          });
          //   toast(`Hello ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === 'admin'
            ? history.push('/admin')
            : history.push('/private');
        });
      })
      .catch((error) => {
        console.log('SIGNIN ERROR', error);
        toast(error.response.data.error);
      });
  };

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  // const [navbarColor, setNavbarColor] = useState(' navbar-transparent');
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
                        Log in
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
