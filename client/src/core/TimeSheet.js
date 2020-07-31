import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import Footer from '../core/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth, setLocalStorage, isWBS } from '../auth/helpers';
import Calendar from 'react-calendar';
import '../calendar.css';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Form,
  CardHeader,
  Input,
  FormGroup,
  Badge,
  Modal,
  ModalBody
} from 'reactstrap';

const TimeSheet = (req, res) => {
  const [value, onChange] = useState(new Date());
  const [levelModal, setLevelModal] = useState(false);
  const [level2Modal, setLevel2Modal] = useState(false);
  const [level3Modal, setLevel3Modal] = useState(false);
  const [dayNumber, setDayNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weeklyWbs, setWeeklyWbs] = useState({
    employeeId: isAuth().employeeId,
    startDate: '',
    arrangement: '',
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  const [values, setValues] = useState({
    code: '',
    title: '',
    level1Wbs: '',
    level2Wbs: '',
    level3Wbs: '',
    hours: '7.5',
    type: '1',
    fullWbsCode: '',
    fullWbsTitle: ''
  });

  const {
    level1Wbs,
    level2Wbs,
    level3Wbs,
    hours,
    type,
    fullWbsCode,
    fullWbsTitle
  } = values;

  useEffect(() => {
    loadWbs();
    loadTimesheet();
    getDayNumber();
  }, []);

  const getDayNumber = () => {
    let dates = [];
    const day = new Date();
    console.log('Day', day.getDay());
    let sunday = 0 - day.getDay();
    do {
      dates.push(sunday);
      sunday++;
    } while (dates.length < 7);
    console.log(dates);
    setDayNumber(dates);
  };

  const loadTimesheet = async function () {
    const id = isAuth().employeeId;
    await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/timesheet/read/${id}`
    })
      .then((response) => {
        if (response.data.error || response.data === null) return;
        console.log(response.data);
        setWeeklyWbs(response.data);
      })
      .catch((error) => {
        toast('Error loading timesheet, Please log out and log in again');
      });
  };

  const loadWbs = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/wbs`
    })
      .then((response) => {
        setLocalStorage('wbs', response.data);
        response.data.forEach((i) => {
          console.log(i.code, '-', i.title);
        });
      })
      .catch((error) => {
        toast('Error loading WBS, Please log out and log in again');
      });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setLevelModal(false);
    setLevel2Modal(false);
    setLevel3Modal(false);
  };

  useEffect(() => {
    setValues({
      ...values,
      fullWbsCode: getFullWBSCode(level1Wbs, level2Wbs, level3Wbs),
      fullWbsTitle: getFullWBSTitle(level1Wbs, level2Wbs, level3Wbs)
    });
  }, [values.level3Wbs]);

  const listLevel1 = () => {
    let arr = [];
    if (isWBS()) {
      isWBS().map((item, idx) => arr.push(`${item.code}-${item.title}`));
      return arr.sort();
    }
  };

  const listLevel2 = (code) => {
    if (code) {
      let arr = [];
      isWBS().forEach((i) => {
        if (i.code === code.split('-')[0]) {
          i.sub.forEach((x) => {
            arr.push(`${x.code}-${x.title}`);
          });
        }
      });

      return arr.sort();
    }
  };
  const listLevel3 = (code1, code2) => {
    // if code1 has a value then map the correct sub and push it to array 1

    let arr1 = [];
    let arr2 = [];

    if (code1) {
      isWBS().forEach((i) => {
        if (i.code === code1.split('-')[0]) {
          arr1.push(i.sub);
        }
      });
    }

    // if code2 has a value then map array1's correct sub and push it to array 2

    if (code2) {
      arr1[0].forEach((i) => {
        if (i.code === code2.split('-')[0]) {
          i.sub.forEach((x) => {
            arr2.push(`${x.code}-${x.title}`);
          });
        }
      });
    }

    return arr2.sort();
  };
  const getFullWBSCode = (level1, level2, level3) => {
    if (level1 && level2 && level3) {
      return `${level1.split('-')[0]}.${level2.split('-')[0]}.${
        level3.split('-')[0]
      }`;
    }
  };

  const getFullWBSTitle = (level1, level2, level3) => {
    if (level1 && level2 && level3) {
      return `${level1.split('-')[1]}-${level2.split('-')[1]}-${
        level3.split('-')[1]
      }`;
    }
  };
  const updateWeek = (day) => {
    let wbs = weeklyWbs[day];
    wbs.push(values);
    setWeeklyWbs({ ...weeklyWbs, [day]: wbs });
  };

  const dailyTotal = (day) => {
    let total = 0;
    weeklyWbs[day].map((shift) => (total += Number(shift.hours)));
    return total;
  };

  const weeklyTotal = () => {
    let sum = 0;
    [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ].forEach((day) => {
      sum += dailyTotal(day);
    });
    return sum;
  };

  const del = (arr, idx, day) => {
    let arr_output = [];
    arr.forEach((v, i) => {
      if (i !== idx) {
        arr_output.push(v);
      }
    });
    setWeeklyWbs({ ...weeklyWbs, [day]: arr_output });
  };

  const renderDate = (day) => {
    if (day < 0) {
      return Moment()
        .subtract(day * -1, 'days')
        .format('Do MMM YYYY ddd');
    } else if (day === 0) {
      return Moment().format('Do MMM YYYY ddd');
    } else {
      return Moment().add(day, 'days').format('Do MMM YYYY ddd');
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/timesheet`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { ...weeklyWbs, startDate: renderDate(dayNumber[0]) }
    })
      .then((response) => {
        setLoading(false);
        toast('Timesheet Successful Saved');
      })
      .catch((error) => {
        setLoading(false);
        toast('Oops error saving timesheet');
      });
  };
  return (
    <>
      <div
        className='cd-section'
        id='contact-us'
        // onClick={() => console.log(value)}
      >
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
                md='3'
                style={{
                  backgroundColor: '#14131d',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                <h3 className='title'>
                  <h6 className='description'>
                    <span>
                      <Badge color='info'>{isAuth().role}</Badge>
                    </span>
                  </h6>
                </h3>

                <img
                  alt='...'
                  className='rounded img-raised text-center'
                  src={require('../img/boy.png')}
                  style={{ paddingBottom: '1rem' }}></img>
                <div style={{ margin: '2rem' }}>
                  <Input
                    className='font-weight-bolder text-center'
                    onChange={(e) => {
                      setWeeklyWbs({
                        ...weeklyWbs,
                        arrangement: e.target.value
                      });
                    }}
                    value={weeklyWbs.arrangement}
                    type='select'
                    name='arrangement'>
                    <option selected=''>Arrangement</option>
                    <option>5/day week</option>
                    <option>4/day week</option>
                    <option>flexible</option>
                  </Input>
                </div>

                {loading ? (
                  <Button
                    className='btn-round pull-center'
                    color='info'
                    type='submit'
                    onClick={clickSubmit}>
                    <i className='now-ui-icons loader_gear spin'></i>
                  </Button>
                ) : (
                  <Button
                    className='btn-round pull-center'
                    color='info'
                    type='submit'
                    onClick={clickSubmit}>
                    Authenticate
                  </Button>
                )}
              </Col>
              <Col
                className='ml-auto mr-auto'
                md='9'
                style={{
                  backgroundColor: '#14131d',
                  padding: '3rem'
                }}>
                <Form className='form-inline'>
                  <Button
                    className='btn-round'
                    color='primary'
                    type='button'
                    onClick={() => setLevelModal(true)}>
                    Level 1 WBS
                  </Button>
                  <Modal
                    isOpen={levelModal}
                    className='modal-sm '
                    modalClassName='bd-example-modal-sm'>
                    <div className='modal-header'>
                      <h4
                        className='modal-title justify-content-center'
                        id='mySmallModalLabel'>
                        Level 1 WBS
                      </h4>
                      <button
                        aria-label='Close'
                        className='close'
                        type='button'
                        onClick={() => setLevelModal(false)}>
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <ModalBody>
                      <Input
                        value={level1Wbs}
                        name='level1Wbs'
                        id='inputState'
                        type='select'
                        onChange={handleChange('level1Wbs')}>
                        <option selected=''>Please Choose</option>
                        {isWBS() &&
                          listLevel1().map((item, idx) => (
                            <option key={idx}>{item}</option>
                          ))}
                      </Input>
                    </ModalBody>
                  </Modal>
                  {level1Wbs ? (
                    <FormGroup className='mx-sm-auto has-success'>
                      <label
                        className='sr-only'
                        htmlFor='inputPassword2'></label>
                      <Input
                        className='font-weight-bolder'
                        disabled
                        placeholder='WBS Level 1'
                        type='text'
                        value={level1Wbs}></Input>
                    </FormGroup>
                  ) : (
                    <FormGroup className='mx-sm-auto'>
                      <label
                        className='sr-only'
                        htmlFor='inputPassword2'></label>
                      <Input
                        className='font-weight-bolder'
                        disabled
                        // id='inputPassword2'
                        placeholder='WBS Level 1'
                        type='text'
                        value={level1Wbs}></Input>
                    </FormGroup>
                  )}
                </Form>
                <Form className='form-inline'>
                  <Button
                    className='btn-round'
                    color='success'
                    type='button'
                    onClick={() => setLevel2Modal(true)}>
                    Level 2 WBS
                  </Button>
                  <Modal
                    isOpen={level2Modal}
                    className='modal-sm'
                    modalClassName='bd-example-modal-sm'>
                    <div className='modal-header'>
                      <h4 className='modal-title' id='mySmallModalLabel'>
                        Level 2 WBS
                      </h4>
                      <button
                        aria-label='Close'
                        className='close'
                        type='button'
                        onClick={() => setLevel2Modal(false)}>
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <ModalBody>
                      <Input
                        value={level2Wbs}
                        name='level2Wbs'
                        id='inputState'
                        type='select'
                        onChange={handleChange('level2Wbs')}>
                        <option selected=''>Please Choose</option>
                        {level1Wbs &&
                          listLevel2(level1Wbs).map((item, idx) => (
                            <option key={idx}>{item}</option>
                          ))}
                      </Input>
                    </ModalBody>
                  </Modal>
                  {level1Wbs && level2Wbs ? (
                    <FormGroup className='mx-sm-auto has-success'>
                      <label
                        className='sr-only'
                        htmlFor='inputPassword2'></label>
                      <Input
                        className='font-weight-bolder'
                        disabled
                        value={level2Wbs}
                        placeholder='WBS Level 2'
                        type='text'></Input>
                    </FormGroup>
                  ) : (
                    <FormGroup className='mx-sm-auto'>
                      <label
                        className='sr-only'
                        htmlFor='inputPassword2'></label>
                      <Input
                        className='font-weight-bolder'
                        disabled
                        value={level2Wbs}
                        placeholder='WBS Level 2'
                        type='text'></Input>
                    </FormGroup>
                  )}
                </Form>
                <Form className='form-inline'>
                  <Button
                    className='btn-round'
                    color='danger'
                    type='button'
                    onClick={() => setLevel3Modal(true)}>
                    Level 3 WBS
                  </Button>
                  <Modal
                    isOpen={level3Modal}
                    className='modal-sm'
                    modalClassName='bd-example-modal-sm'>
                    <div className='modal-header'>
                      <h4 className='modal-title' id='mySmallModalLabel'>
                        Level 3 WBS
                      </h4>
                      <button
                        aria-label='Close'
                        className='close'
                        type='button'
                        onClick={() => setLevel3Modal(false)}>
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <ModalBody>
                      <Input
                        value={level3Wbs}
                        name='level3Wbs'
                        id='inputState'
                        type='select'
                        onChange={handleChange('level3Wbs')}>
                        <option selected=''>Please Choose</option>
                        {level1Wbs &&
                          level2Wbs &&
                          listLevel3(level1Wbs, level2Wbs).map((item, idx) => (
                            <option key={idx}>{item}</option>
                          ))}
                      </Input>
                    </ModalBody>
                  </Modal>
                  {level1Wbs && level2Wbs && level3Wbs ? (
                    <FormGroup className='mx-sm-auto has-success'>
                      <label
                        className='sr-only'
                        htmlFor='inputPassword2'></label>
                      <Input
                        className='font-weight-bolder'
                        value={level3Wbs}
                        disabled
                        placeholder='WBS Level 3'
                        type='text'></Input>
                    </FormGroup>
                  ) : (
                    <FormGroup className='mx-sm-auto'>
                      <label
                        className='sr-only'
                        htmlFor='inputPassword2'></label>
                      <Input
                        className='font-weight-bolder'
                        value={level3Wbs}
                        disabled
                        placeholder='WBS Level 3'
                        type='text'></Input>
                    </FormGroup>
                  )}
                </Form>

                <Form style={{ paddingTop: '2rem' }}>
                  <div className='form-row'>
                    <FormGroup className='col-md-4'>
                      <Input
                        className='font-weight-bolder'
                        value={fullWbsCode}
                        onChange={handleChange('fullWbsCode')}
                        disabled
                        name='fullWbsCode'
                        // id='inputEmail4'
                        placeholder='Full WBS Code'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <Input
                        className='font-weight-bolder'
                        value={fullWbsTitle}
                        name='fullWbsTitle'
                        disabled
                        // id='inputEmail4'
                        placeholder='Full WBS Title'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-2'>
                      <Input
                        className='font-weight-bolder'
                        // id='inputPassword4'
                        placeholder='Hours'
                        name='hours'
                        type='select'
                        value={hours}
                        onChange={handleChange('hours')}>
                        <option selected=''>Hours</option>
                        <option>3</option>
                        <option>3.5</option>
                        <option>4</option>
                        <option>4.5</option>
                        <option>5</option>
                        <option>5.5</option>
                        <option>6</option>
                        <option>6.5</option>
                        <option>7</option>
                        <option>7.5</option>
                        <option>8</option>
                        <option>8.5</option>
                        <option>9</option>
                        <option>9.5</option>
                        <option>10</option>
                        <option>10.5</option>
                        <option>11</option>
                        <option>11.5</option>
                        <option>12</option>
                      </Input>
                    </FormGroup>
                    <FormGroup className='col-md-2'>
                      <Input
                        className='font-weight-bolder'
                        type='select'
                        name='type'
                        value={type}
                        onChange={handleChange('type')}>
                        <option selected=''>Type</option>
                        <option>1</option>
                        <option>1.5</option>
                        <option>2.0</option>
                      </Input>
                    </FormGroup>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
          <Container>
            <div className='text-muted'>
              <strong>
                Total Weekly Hours:{' '}
                <Button className='btn-link btn-lg' color='primary'>
                  {weeklyTotal()}
                </Button>{' '}
              </strong>
            </div>
            <Calendar onChange={onChange} value={value} />
          </Container>
          {/* -------------------------------------------------------------------------------------- */}
          <Container style={{ paddingTop: '1.5rem', height: '100%' }}>
            <Row>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('sunday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='danger'
                    onClick={() => {
                      updateWeek('sunday');
                    }}>
                    {renderDate(dayNumber[0])}
                  </Button>
                  {weeklyWbs.sunday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.sunday, index, 'sunday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('monday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('monday')}>
                    {renderDate(dayNumber[1])}
                  </Button>
                  {weeklyWbs.monday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.monday, index, 'monday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('tuesday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('tuesday')}>
                    {renderDate(dayNumber[2])}
                  </Button>
                  {weeklyWbs.tuesday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.tuesday, index, 'tuesday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('wednesday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('wednesday')}>
                    {renderDate(dayNumber[3])}
                  </Button>
                  {weeklyWbs.wednesday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.wednesday, index, 'wednesday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('thursday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('thursday')}>
                    {renderDate(dayNumber[4])}
                  </Button>
                  {weeklyWbs.thursday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.thursday, index, 'thursday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('friday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('friday')}>
                    {renderDate(dayNumber[5])}
                  </Button>
                  {weeklyWbs.friday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.friday, index, 'friday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <div className='pull-right'>
                    <strong style={{ color: 'green' }}>
                      {dailyTotal('saturday')}
                    </strong>
                  </div>
                </CardHeader>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='danger'
                    onClick={() => updateWeek('saturday')}>
                    {renderDate(dayNumber[6])}
                  </Button>
                  {weeklyWbs.saturday.map((val, index) => (
                    <>
                      <Card
                        style={{
                          backgroundColor: '#1E1D2D',
                          paddingTop: '1em'
                        }}>
                        <h6 className='text-muted'>
                          <strong>Code:</strong> {val.fullWbsCode}
                        </h6>
                        <h6 className='text-muted'>
                          <strong>Title:</strong> {val.fullWbsTitle}
                        </h6>

                        <h6 className='text-muted'>
                          <strong>Type:</strong> {val.type}
                        </h6>
                        <CardFooter>
                          <div className='stats pull-left'>
                            <i className='now-ui-icons tech_watch-time'></i>
                            <strong style={{ color: 'yellow' }}>
                              {val.hours}
                            </strong>
                          </div>
                          <div className='stats pull-right'>
                            <i
                              className='now-ui-icons ui-1_simple-delete'
                              type='button'
                              onClick={() =>
                                del(weeklyWbs.saturday, index, 'saturday')
                              }></i>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  ))}
                </CardBody>
              </Card>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TimeSheet;
