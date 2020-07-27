import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../core/Logo';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import Footer from '../core/Footer';
import {
  isAuth,
  getCookie,
  signout,
  updateUser,
  setLocalStorage,
  isWBS
} from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// reactstrap components
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
  Badge,
  Table,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

const Level1TimeSheet = (req, res) => {
  const [levelModal, setLevelModal] = useState(false);
  const [level2Modal, setLevel2Modal] = useState(false);
  const [level3Modal, setLevel3Modal] = useState(false);
  const [weeklyWbs, setWeeklyWbs] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  const del = (arr, idx, day) => {
    let arr_output = [];
    arr.map((v, i) => {
      if (i != idx) {
        arr_output.push(v);
      }
    });
    setWeeklyWbs({ ...weeklyWbs, [day]: arr_output });
  };
  // arr.splice(arr.indexOf(item), 1)
  const [values, setValues] = useState({
    code: '',
    title: '',
    level: '',
    level1Wbs: '',
    level2Wbs: '',
    level3Wbs: '',
    hours: '',
    type: 'Normal',
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
  }, []);

  const loadWbs = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/wbs`
    })
      .then((response) => {
        setLocalStorage('wbs', response.data);
        response.data.map((i) => {
          console.log(i.code, '-', i.title);
        });
      })
      .catch((error) => {
        console.log('Error in Loading WBS', error);
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
      isWBS().map((i) => {
        if (i.code === code.split('-')[0]) {
          i.sub.map((x) => {
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
      isWBS().map((i) => {
        if (i.code === code1.split('-')[0]) {
          arr1.push(i.sub);
        }
      });
    }

    // if code2 has a value then map array1's correct sub and push it to array 2

    if (code2) {
      arr1[0].map((i) => {
        if (i.code === code2.split('-')[0]) {
          i.sub.map((x) => {
            arr2.push(`${x.code}-${x.title}`);
          });
        }
      });
    }

    return arr2.sort();
  };
  const getFullWBSCode = (level1, level2, level3) => {
    if (level1 && level2 && level3) {
      console.log('am i working');
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

  return (
    <>
      <div
        className='cd-section'
        id='contact-us'
        onClick={() => console.log(weeklyWbs)}>
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
                      <Badge color='info'>Level1</Badge>
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
                    id='inputPassword4'
                    type='select'
                    name='type'>
                    <option selected=''>Arrangement</option>
                    <option>5/day week</option>
                    <option>4/day week</option>
                    <option>flexible</option>
                  </Input>
                </div>

                <Button
                  className='btn-round pull-center'
                  color='info'
                  type='submit'>
                  Authenticate
                </Button>
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
                    modalClassName='bd-example-modal-sm'
                    // onClick={() => setLevel1Modal(false)}
                  >
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
                        {console.log('level1wbs:', level1Wbs)}
                      </Input>
                    </ModalBody>
                  </Modal>
                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      className='font-weight-bolder'
                      disabled
                      id='inputPassword2'
                      placeholder='WBS Level 1'
                      type='text'
                      value={level1Wbs}></Input>
                  </FormGroup>
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
                    modalClassName='bd-example-modal-sm'
                    // onClick={() => setLevel1Modal(false)}
                  >
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
                        {console.log('level2wbs:', level2Wbs)}
                        {level1Wbs &&
                          listLevel2(level1Wbs).map((item, idx) => (
                            <option key={idx}>{item}</option>
                          ))}
                      </Input>
                    </ModalBody>
                  </Modal>

                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      className='font-weight-bolder'
                      disabled
                      value={level2Wbs}
                      id='inputPassword2'
                      placeholder='WBS Level 2'
                      type='text'></Input>
                  </FormGroup>
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
                    modalClassName='bd-example-modal-sm'
                    // onClick={() => setLevel1Modal(false)}
                  >
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
                        {console.log('level3wbs:', level3Wbs)}
                        <option selected=''>Please Choose</option>
                        {level1Wbs &&
                          level2Wbs &&
                          listLevel3(level1Wbs, level2Wbs).map((item, idx) => (
                            <option key={idx}>{item}</option>
                          ))}
                      </Input>
                    </ModalBody>
                  </Modal>

                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      className='font-weight-bolder'
                      value={level3Wbs}
                      disabled
                      id='inputPassword2'
                      placeholder='WBS Level 3'
                      type='text'></Input>
                  </FormGroup>
                </Form>

                <Form style={{ paddingTop: '2rem' }}>
                  <div className='form-row'>
                    <FormGroup className='col-md-4'>
                      {console.log('fullWbsCode:', fullWbsCode)}
                      <Input
                        className='font-weight-bolder'
                        value={fullWbsCode}
                        onChange={handleChange('fullWbsCode')}
                        disabled
                        name='fullWbsCode'
                        id='inputEmail4'
                        placeholder='Full WBS Code'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      {console.log('fullWbsTitle:', fullWbsTitle)}
                      <Input
                        className='font-weight-bolder'
                        value={fullWbsTitle}
                        name='fullWbsTitle'
                        disabled
                        id='inputEmail4'
                        placeholder='Full WBS Title'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-2'>
                      <Input
                        className='font-weight-bolder'
                        id='inputPassword4'
                        placeholder='Hours'
                        name='hours'
                        type='number'
                        value={hours}
                        onChange={handleChange('hours')}></Input>
                    </FormGroup>
                    <FormGroup className='col-md-2'>
                      <Input
                        className='font-weight-bolder'
                        id='inputPassword4'
                        type='select'
                        name='type'
                        value={type}
                        onChange={handleChange('type')}>
                        <option selected=''>Type</option>
                        <option>Normal</option>
                        <option>1.5x</option>
                        <option>2.0x</option>
                      </Input>
                    </FormGroup>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>

          <Container style={{ paddingTop: '1.5rem', height: '100%' }}>
            <Row>
              <Card
                className='text-center'
                style={{
                  width: '9.3rem',
                  margin: '.5em',
                  backgroundColor: '#14131d'
                }}>
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='danger'
                    onClick={() => updateWeek('sunday')}>
                    Sunday
                  </Button>
                  {weeklyWbs.sunday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong> {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong> {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() => del(weeklyWbs.sunday, index, 'sunday')}>
                        x
                      </button>
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
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('monday')}>
                    Monday
                  </Button>
                  {weeklyWbs.monday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong> {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong> {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() => del(weeklyWbs.monday, index, 'monday')}>
                        x
                      </button>
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
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('tuesday')}>
                    Tuesday
                  </Button>
                  {weeklyWbs.tuesday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong> {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong> {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() =>
                          del(weeklyWbs.tuesday, index, 'tuesday')
                        }>
                        x
                      </button>
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
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('wednesday')}>
                    Wednesday
                  </Button>
                  {weeklyWbs.wednesday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong>: {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong>: {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() =>
                          del(weeklyWbs.wednesday, index, 'wednesday')
                        }>
                        x
                      </button>
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
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('thursday')}>
                    Thursday
                  </Button>
                  {weeklyWbs.thursday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong> {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong> {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() =>
                          del(weeklyWbs.thursday, index, 'thursday')
                        }>
                        x
                      </button>
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
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='info'
                    onClick={() => updateWeek('friday')}>
                    Friday
                  </Button>
                  {weeklyWbs.friday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong>
                        {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong>
                        {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() => del(weeklyWbs.friday, index, 'friday')}>
                        x
                      </button>
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
                <CardBody style={{ backgroundColor: '#14131d' }}>
                  <Button
                    className='btn-link'
                    color='danger'
                    onClick={() => updateWeek('saturday')}>
                    Saturday
                  </Button>
                  {weeklyWbs.saturday.map((val, index) => (
                    <>
                      <h6 className='text-muted'>
                        <strong>Code:</strong> {val.fullWbsCode}
                      </h6>
                      <h6 className='text-muted'>
                        <strong>Title:</strong> {val.fullWbsTitle}
                      </h6>
                      <button
                        style={{ background: '#14131d' }}
                        className='btn-icon btn-neutral'
                        color='danger'
                        size='sm'
                        type='button'
                        onClick={() =>
                          del(weeklyWbs.saturday, index, 'saturday')
                        }>
                        x
                      </button>
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

export default Level1TimeSheet;
