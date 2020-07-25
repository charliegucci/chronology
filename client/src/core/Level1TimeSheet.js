import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../core/Logo';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
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
  ModalFooter
} from 'reactstrap';

const Level1TimeSheet = (req, res) => {
  const [levelModal, setLevelModal] = useState(false);
  const [level2Modal, setLevel2Modal] = useState(false);
  const [level3Modal, setLevel3Modal] = useState(false);
  const [values, setValues] = useState({
    code: '',
    title: '',
    level: '',
    wbs: [],
    level1Wbs: '',
    level2Wbs: '',
    level3Wbs: ''
  });

  const { wbs, level1Wbs, level2Wbs, level3Wbs } = values;
  useEffect(() => {
    loadWbs();
  }, []);

  const loadWbs = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/wbs`
    })
      .then((response) => {
        setValues({ wbs: [...values.wbs, response.data] });
        setLocalStorage('wbs', response.data);
        console.log(
          response.data.map((i) => console.log(i.code, '-', i.title))
        );
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

  const listLevel1 = () => {
    let arr = [];
    isWBS().map((item, idx) => arr.push(`${item.code}-${item.title}`));

    return arr.sort();
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

      console.log('this one:', arr);

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

    console.log('array 2: ', arr2);

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

  return (
    <>
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

                <h6 className='info-title'>
                  <strong>Arrangement:</strong>
                </h6>

                <h6 className='info-title'>
                  <strong>Team:</strong>
                </h6>
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
                    className='modal-sm'
                    modalClassName='bd-example-modal-sm'
                    // onClick={() => setLevel1Modal(false)}
                  >
                    <div className='modal-header'>
                      <h4 className='modal-title' id='mySmallModalLabel'>
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
                        {listLevel1().map((item, idx) => (
                          <option key={idx}>{item}</option>
                        ))}
                      </Input>
                    </ModalBody>
                  </Modal>
                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
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
                      <Input
                        value={getFullWBSCode(level1Wbs, level2Wbs, level3Wbs)}
                        disabled
                        id='inputEmail4'
                        placeholder='Full WBS Code'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <Input
                        value={getFullWBSTitle(level1Wbs, level2Wbs, level3Wbs)}
                        disabled
                        id='inputEmail4'
                        placeholder='Full WBS Title'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-2'>
                      <Input
                        id='inputPassword4'
                        placeholder='Hours'
                        type='number'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-2'>
                      <Input id='inputState' type='select'>
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
          <Container style={{ paddingTop: '1.5rem' }}>
            <Row>
              <Card
                className='card-plain'
                style={{
                  backgroundColor: '#14131d'
                }}>
                <CardHeader>
                  <CardTitle tag='h4'></CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Mon</strong>
                          </h6>
                        </th>
                        <th className='text-left'></th>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Tue</strong>
                          </h6>
                        </th>
                        <th className='text-left'></th>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Wed</strong>
                          </h6>
                        </th>
                        <th className='text-left'></th>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Thu</strong>
                          </h6>
                        </th>
                        <th className='text-left'></th>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Fri</strong>
                          </h6>
                        </th>
                        <th className='text-left'></th>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Sat</strong>
                          </h6>
                        </th>
                        <th className='text-left'></th>
                        <th className='text-center'>
                          <h6 className='text-muted'>
                            <strong>Sun</strong>
                          </h6>
                        </th>
                        <th className='text-right'></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-left'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-right'></td>
                        <td className='text-right'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-left'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-right'></td>
                        <td className='text-right'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-left'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-right'></td>
                        <td className='text-right'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-left'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-right'></td>
                        <td className='text-right'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-left'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-center'></td>
                        <td className='text-left'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className='text-right'></td>
                        <td className='text-right'>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type='checkbox'></Input>
                              <span className='form-check-sign'></span>
                            </Label>
                          </FormGroup>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Level1TimeSheet;
