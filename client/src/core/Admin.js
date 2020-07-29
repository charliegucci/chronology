import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../core/Logo';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Profile from '../core/Profile';

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

const Admin = ({ history }) => {
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
    success: false,
    loading: false
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
    success,
    loading
  } = values;

  const token = getCookie('token');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    setValues({ ...values, loading: true });
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
          dob,
          loading: false
        });
      })
      .catch((error) => {
        setValues({ ...values, loading: false });
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
    setValues({ ...values, loading: true });
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
          setValues({ ...values, success: true, loading: false });
          toast('Profile Updated Successfully');
        });
      })
      .catch((error) => {
        console.log('UPDATE ERROR', error.response.data.error);
        setValues({ ...values, loading: false });
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

  return <Profile />;
};

export default Admin;
