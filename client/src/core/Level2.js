import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../core/Logo';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
  Form,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  FormGroup,
  Badge
} from 'reactstrap';

const Level2 = ({ history }) => {
  const [values, setValues] = useState({
    role: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    workEmail: '',
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
    success: false
  });
  const {
    role,
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
    success
  } = values;

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
        const {
          role,
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
        } = response.data;

        setValues({
          ...values,
          role,
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
    setValues({ ...values, [name]: event.target.value, success: false });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/level2/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        firstName,
        lastName,
        password,
        personalEmail,
        personalPhone,
        personalAddress,
        company,
        section,
        dob
      }
    })
      .then((response) => {
        console.log('UPDATE SUCCESS', response);
        updateUser(response, () => {
          setValues({ ...values, success: true });
          toast('Profile Updated Successfully');
        });
      })
      .catch((error) => {
        console.log('UPDATE ERROR', error.response.data.error);
        setValues({ ...values });
        toast(error.response.data.error);
      });
  };

  const [first1Focus, setFirst1Focus] = useState(false);
  const [last1Focus, setLast1Focus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [perEmailFocus, setPerEmailFocus] = useState(false);
  const [perPhoneFocus, setPerPhoneFocus] = useState(false);
  const [perAddressFocus, setPerAddressFocus] = useState(false);
  const [sectionFocus, setSectionFocus] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);
  const [companyFocus, setCompanyFocus] = useState(false);

  return (
    <div className='cd-section' id='contact-us'>
      <ToastContainer position='bottom-right' />
      <DropdownScrollNavbar />
      <div
        className='contactus-1 section-image'
        style={{
          backgroundColor: '#1E1D2D'
        }}>
        <Container>
          <Row>
            <Col
              md='5'
              style={{ backgroundColor: '#14131d', padding: '1.5rem' }}>
              <h3 className='title'>
                {firstName} {lastName}
                <h6 className='description'>
                  <span>
                    <Badge color='info'>{role}</Badge>
                  </span>
                </h6>
              </h3>
              <h5 className='info-title'>
                <strong>Job Title:</strong>
              </h5>{' '}
              <h6 className='description'>{jobTitle}</h6>
              <h5 className='info-title'>
                <strong>Employee ID:</strong>
              </h5>{' '}
              <h6 className='description'>{employeeId}</h6>
              <h5 className='info-title'>
                <strong>Work Email:</strong>
              </h5>
              <h6 className='description'>{workEmail}</h6>
              <h5 className='info-title'>
                <strong>Section:</strong>
              </h5>
              <h6 className='description'>{section}</h6>
              <h5 className='info-title'>
                <strong>Superior ID:</strong>
              </h5>
              <h6 className='description'>{superiorEmployeeId}</h6>
              <div className='info info-horizontal'>
                <div className='icon icon-info'>
                  <i className='now-ui-icons location_pin'></i>
                </div>
                <div className='description'>
                  <h4 className='info-title'>
                    <strong>Work Address:</strong>
                  </h4>
                  <p className='description'>
                    65-75 Pandanus Ave, <br></br>
                    Brisbane Airport QLD <br></br>
                    QLD 4008
                  </p>
                </div>
              </div>
              <div className='info info-horizontal'>
                <div className='icon icon-info'>
                  <i className='now-ui-icons tech_mobile'></i>
                </div>
                <div className='description'>
                  <h4 className='info-title'>
                    <strong>Contact:</strong>
                  </h4>
                  <p className='description'>
                    {workPhone} <br></br>
                    {personalPhone}
                    <br></br>
                    {personalEmail}
                  </p>
                </div>
              </div>
            </Col>
            <Col className='ml-auto mr-auto' md='5'>
              <Card
                className='card-contact card-raised'
                style={{ backgroundColor: '#dcdcdc' }}>
                <Form id='contact-form1' method='post' role='form'>
                  <CardHeader className='text-center'>
                    <CardTitle tag='h4'>Details</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className='pr-2' md='6'>
                        <label>
                          <strong>First name</strong>
                        </label>
                        <InputGroup
                          className={first1Focus ? 'input-group-focus' : ''}>
                          <Input
                            aria-label='First Name...'
                            autoComplete='given-name'
                            placeholder='First Name...'
                            type='text'
                            onFocus={() => setFirst1Focus(true)}
                            onBlur={() => setFirst1Focus(false)}
                            value={firstName}
                            onChange={handleChange('firstName')}></Input>
                        </InputGroup>
                      </Col>
                      <Col className='pl-2' md='6'>
                        <FormGroup>
                          <label>
                            <strong>Last name</strong>
                          </label>
                          <InputGroup
                            className={last1Focus ? 'input-group-focus' : ''}>
                            <Input
                              aria-label='Last Name...'
                              autoComplete='family-name'
                              placeholder='Last Name...'
                              type='text'
                              onFocus={() => setLast1Focus(true)}
                              onBlur={() => setLast1Focus(false)}
                              value={lastName}
                              onChange={handleChange('lastName')}></Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-2' md='6'>
                        <label>
                          <strong>Password</strong>
                        </label>
                        <InputGroup
                          className={passwordFocus ? 'input-group-focus' : ''}>
                          <Input
                            aria-label='Password...'
                            autoComplete='password'
                            placeholder='Update Password...'
                            type='password'
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            value={password}
                            onChange={handleChange('password')}></Input>
                        </InputGroup>
                      </Col>
                      <Col className='pl-2' md='6'>
                        <FormGroup>
                          <label>
                            <strong>Company</strong>
                          </label>
                          <InputGroup
                            className={companyFocus ? 'input-group-focus' : ''}>
                            <Input
                              aria-label='Company...'
                              autoComplete='company'
                              placeholder='Company...'
                              type='text'
                              onFocus={() => setCompanyFocus(true)}
                              onBlur={() => setCompanyFocus(false)}
                              value={company}
                              onChange={handleChange('company')}></Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-2' md='6'>
                        <label>
                          <strong>Personal Email</strong>
                        </label>
                        <InputGroup
                          className={perEmailFocus ? 'input-group-focus' : ''}>
                          <Input
                            aria-label='Personal Email...'
                            autoComplete='personal-email'
                            placeholder='Personal Email...'
                            type='text'
                            onFocus={() => setPerEmailFocus(true)}
                            onBlur={() => setPerEmailFocus(false)}
                            value={personalEmail}
                            onChange={handleChange('personalEmail')}></Input>
                        </InputGroup>
                      </Col>
                      <Col className='pl-2' md='6'>
                        <FormGroup>
                          <label>
                            <strong>Personal Phone</strong>
                          </label>
                          <InputGroup
                            className={
                              perPhoneFocus ? 'input-group-focus' : ''
                            }>
                            <Input
                              aria-label='Personal Phone...'
                              autoComplete='personal-phone'
                              placeholder='Personal Phone...'
                              type='number'
                              onFocus={() => setPerPhoneFocus(true)}
                              onBlur={() => setPerPhoneFocus(false)}
                              value={personalPhone}
                              onChange={handleChange('personalPhone')}></Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <label>
                        <strong>Home Address</strong>
                      </label>
                      <InputGroup
                        className={perAddressFocus ? 'input-group-focus' : ''}>
                        <Input
                          autoComplete='home address'
                          placeholder='Home Address here...'
                          type='text'
                          onFocus={() => setPerAddressFocus(true)}
                          onBlur={() => setPerAddressFocus(false)}
                          value={personalAddress}
                          onChange={handleChange('personalAddress')}></Input>
                      </InputGroup>
                    </FormGroup>
                    <Row>
                      <Col className='pr-2' md='6'>
                        <label>
                          <strong>Section</strong>
                        </label>
                        <InputGroup
                          className={sectionFocus ? 'input-group-focus' : ''}>
                          <Input
                            aria-label='Section...'
                            autoComplete='section'
                            placeholder='Section...'
                            type='text'
                            onFocus={() => setSectionFocus(true)}
                            onBlur={() => setSectionFocus(false)}
                            value={section}
                            onChange={handleChange('section')}></Input>
                        </InputGroup>
                      </Col>
                      <Col className='pl-2' md='6'>
                        <FormGroup>
                          <label>
                            <strong>Date of Birth</strong>
                          </label>
                          <InputGroup
                            className={dobFocus ? 'input-group-focus' : ''}>
                            <Input
                              aria-label='Date of Birth...'
                              autoComplete='dob'
                              placeholder='Date of Birth...'
                              type='date'
                              onFocus={() => setDobFocus(true)}
                              onBlur={() => setDobFocus(false)}
                              value={dob}
                              onChange={handleChange('dob')}></Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Col md='12'>
                      {success ? (
                        <Button
                          block
                          className='btn-round  '
                          color='info'
                          type='submit'
                          onClick={clickSubmit}>
                          Done{' '}
                          <i
                            className='now-ui-icons ui-1_check'
                            style={{ color: '#39ff14' }}></i>
                        </Button>
                      ) : (
                        <Button
                          block
                          className='btn-round  '
                          color='info'
                          type='submit'
                          onClick={clickSubmit}>
                          Update{' '}
                        </Button>
                      )}
                    </Col>
                  </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Level2;
