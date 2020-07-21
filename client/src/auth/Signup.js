import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import Logo from '../core/Logo';
import ImageUpload from '../core/ImageUpload';
import axios from 'axios';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/scss/now-ui-kit.scss';
import defaultImage from '../img/image_placeholder.jpg';
import defaultAvatar from '../img/placeholder.jpg';
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
  Navbar,
  FormGroup,
  FormText
} from 'reactstrap';

// core components
// import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import Footer from '../core/Footer';

const Signup = ({ history }) => {
  const [values, setValues] = useState({
    employeeId: '',
    workEmail: '',
    firstName: '',
    lastName: '',
    password: '',
    workPhone: '',
    workAddress: '',
    personalEmail: '',
    personalPhone: '',
    personalAddress: '',
    company: '',
    section: '',
    jobTitle: '',
    authLevel: '',
    superiorEmployeeId: '',
    dob: '',
    success: false,
    loading: false
  });

  const {
    employeeId,
    workEmail,
    firstName,
    lastName,
    password,
    workPhone,
    workAddress,
    personalEmail,
    personalPhone,
    personalAddress,
    company,
    section,
    jobTitle,
    authLevel,
    superiorEmployeeId,
    dob,
    success,
    loading
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, success: false });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: {
        employeeId,
        workEmail,
        firstName,
        lastName,
        password,
        workPhone,
        workAddress,
        personalEmail,
        personalPhone,
        personalAddress,
        company,
        section,
        jobTitle,
        authLevel,
        superiorEmployeeId,
        dob
      }
    })
      .then((response) => {
        console.log('SIGNUP SUCCESS', response);
        setValues({
          ...values,
          employeeId: '',
          workEmail: '',
          firstName: '',
          lastName: '',
          password: '',
          workPhone: '',
          workAddress: '',
          personalEmail: '',
          personalPhone: '',
          personalAddress: '',
          company: '',
          section: '',
          jobTitle: '',
          authLevel: '',
          superiorEmployeeId: '',
          dob: '',
          success: true,
          loading: false
        });
        toast(response.data.message);
      })
      .catch((error) => {
        console.log('SIGNUP ERROR', error.response.data);
        setValues({ ...values, loading: false });
        toast(error.response.data.error);
      });
  };
  const [firstFocus, setFirstFocus] = useState(false);
  const [secondFocus, setSecondFocus] = useState(false);
  const [thirdFocus, setThirdFocus] = useState(false);
  const [fourthFocus, setFourthFocus] = useState(false);
  const [fifthFocus, setFifthFocus] = useState(false);
  const [sixthFocus, setSixthFocus] = useState(false);
  const [seventhFocus, setSeventhFocus] = useState(false);
  const [eightFocus, setEightFocus] = useState(false);
  const [ninethFocus, setNinethFocus] = useState(false);
  const [tenthFocus, setTenthFocus] = useState(false);
  const [eleventhFocus, setEleventhFocus] = useState(false);
  const [twelvethFocus, setTwelvethFocus] = useState(false);
  const [thirteenthFocus, setThirteenthFocus] = useState(false);
  const [fourteenthFocus, setFourteenthFocus] = useState(false);
  const [fifteenthFocus, setFifteenthFocus] = useState(false);
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
      {isAuth() ? <Redirect to='/level1' /> : null}

      <div className='page-header header-filter'>
        <div
          className='page-header-image'
          style={{
            backgroundColor: '#1E1D2D'
          }}></div>
        <div className='content'>
          <Container>
            <Logo />
            <Card className='card-login card-plain'>
              <Form
                action=''
                className='form'
                method=''
                style={{ backgroundColor: '#14131d', padding: '1.5rem' }}>
                <CardHeader className='text-center'>
                  Register Account
                </CardHeader>
                <CardBody>
                  <div className='form-row'>
                    <FormGroup className='col-md-6'>
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
                          placeholder='Employee ID'
                          type='text'
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleChange('employeeId')}
                          value={employeeId}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-6'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (secondFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons objects_key-25'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Password'
                          type='password'
                          onFocus={() => setSecondFocus(true)}
                          onBlur={() => setSecondFocus(false)}
                          onChange={handleChange('password')}
                          value={password}></Input>
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div className='form-row'>
                    <FormGroup className='col-md-6'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (thirdFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons users_single-02'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='First Name'
                          type='text'
                          onFocus={() => setThirdFocus(true)}
                          onBlur={() => setThirdFocus(false)}
                          onChange={handleChange('firstName')}
                          value={firstName}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-6'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (fourthFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons users_single-02'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Last Name'
                          type='text'
                          onFocus={() => setFourthFocus(true)}
                          onBlur={() => setFourthFocus(false)}
                          onChange={handleChange('lastName')}
                          value={lastName}></Input>
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div className='form-row'>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (fifthFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_email-85'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Work Email'
                          type='text'
                          onFocus={() => setFifthFocus(true)}
                          onBlur={() => setFifthFocus(false)}
                          onChange={handleChange('workEmail')}
                          value={workEmail}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (sixthFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons tech_mobile'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Work Phone'
                          type='number'
                          onFocus={() => setSixthFocus(true)}
                          onBlur={() => setSixthFocus(false)}
                          onChange={handleChange('workPhone')}
                          value={workPhone}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (seventhFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_email-85'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Personal Email'
                          type='email'
                          onFocus={() => setSeventhFocus(true)}
                          onBlur={() => setSeventhFocus(false)}
                          onChange={handleChange('personalEmail')}
                          value={personalEmail}></Input>
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div className='form-row'>
                    <FormGroup className='col-md-6'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (eightFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons location_pin'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Personal Phone'
                          type='number'
                          onFocus={() => setEightFocus(true)}
                          onBlur={() => setEightFocus(false)}
                          onChange={handleChange('personalPhone')}
                          value={personalPhone}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-6'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (ninethFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons location_pin'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Work Address'
                          type='text'
                          onFocus={() => setNinethFocus(true)}
                          onBlur={() => setNinethFocus(false)}
                          onChange={handleChange('workAddress')}
                          value={workAddress}></Input>
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <FormGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (tenthFocus ? ' input-group-focus' : '')
                      }>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='now-ui-icons location_map-big'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='Home Address'
                        type='text'
                        onFocus={() => setTenthFocus(true)}
                        onBlur={() => setTenthFocus(false)}
                        onChange={handleChange('personalAddress')}
                        value={personalAddress}></Input>
                    </InputGroup>
                  </FormGroup>
                  <div className='form-row'>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (eleventhFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons business_bank'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Company'
                          type='text'
                          onFocus={() => setEleventhFocus(true)}
                          onBlur={() => setEleventhFocus(false)}
                          onChange={handleChange('company')}
                          value={company}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (twelvethFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons design_vector'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Section'
                          type='text'
                          onFocus={() => setTwelvethFocus(true)}
                          onBlur={() => setTwelvethFocus(false)}
                          onChange={handleChange('section')}
                          value={section}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (thirteenthFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons travel_info'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Job Title'
                          type='text'
                          onFocus={() => setThirteenthFocus(true)}
                          onBlur={() => setThirteenthFocus(false)}
                          onChange={handleChange('jobTitle')}
                          value={jobTitle}></Input>
                      </InputGroup>
                    </FormGroup>
                  </div>
                  <div className='form-row'>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (fourteenthFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_lock-circle-open'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Authority Level'
                          type='text'
                          onFocus={() => setFourteenthFocus(true)}
                          onBlur={() => setFourteenthFocus(false)}
                          onChange={handleChange('authLevel')}
                          value={authLevel}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (fifteenthFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons business_badge'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Superior Employee ID'
                          type='number'
                          onFocus={() => setFifteenthFocus(true)}
                          onBlur={() => setFifteenthFocus(false)}
                          onChange={handleChange('superiorEmployeeId')}
                          value={superiorEmployeeId}></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (lastFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_calendar-60'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Date of Birth'
                          type='date'
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                          onChange={handleChange('dob')}
                          value={dob}></Input>
                      </InputGroup>
                      <FormText color='default'>Date of Birth</FormText>
                    </FormGroup>
                  </div>
                </CardBody>
                <Col>
                  {success ? (
                    <Link style={{ color: '#D55209' }} to='/'>
                      Back to Login
                    </Link>
                  ) : (
                    <Button
                      className='btn-round pull-center'
                      color='info'
                      onClick={clickSubmit}
                      size='lg'>
                      {loading ? (
                        <i className='now-ui-icons loader_gear spin'> </i>
                      ) : (
                        <span>Register</span>
                      )}
                    </Button>
                  )}
                </Col>
                <div className='pull-left'>
                  <h6>
                    <Link to='/signin'>Already Registered?</Link>
                  </h6>
                </div>
              </Form>
            </Card>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Signup;
