import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../core/Logo';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
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
  Label
} from 'reactstrap';

const Level1TimeSheet = (req, res) => {
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
                  Wilson E
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
                  <Button className='btn-round' color='primary' type='submit'>
                    Level 1 WBS
                  </Button>

                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      disabled
                      id='inputPassword2'
                      placeholder='WBS Level 1'
                      type='text'></Input>
                  </FormGroup>
                </Form>
                <Form className='form-inline'>
                  <Button className='btn-round' color='success' type='submit'>
                    Level 2 WBS
                  </Button>

                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      disabled
                      id='inputPassword2'
                      placeholder='WBS Level 2'
                      type='text'></Input>
                  </FormGroup>
                </Form>
                <Form className='form-inline'>
                  <Button className='btn-round' color='danger' type='submit'>
                    Level 3 WBS
                  </Button>

                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      disabled
                      id='inputPassword2'
                      placeholder='WBS Level 3'
                      type='text'></Input>
                  </FormGroup>
                </Form>
                <Form className='form-inline'>
                  <Button className='btn-round' color='warning' type='submit'>
                    Level 4 WBS
                  </Button>

                  <FormGroup className='mx-sm-auto'>
                    <label className='sr-only' htmlFor='inputPassword2'></label>
                    <Input
                      disabled
                      id='inputPassword2'
                      placeholder='WBS Level 4'
                      type='text'></Input>
                  </FormGroup>
                </Form>
                <Form style={{ paddingTop: '2rem' }}>
                  <div className='form-row'>
                    <FormGroup className='col-md-8'>
                      <Input
                        id='inputEmail4'
                        placeholder='Full WBS'
                        type='text'></Input>
                    </FormGroup>
                    <FormGroup className='col-md-4'>
                      <Input
                        id='inputPassword4'
                        placeholder='Hours'
                        type='number'></Input>
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
                        <th className='text-center'>Mon</th>
                        <th className='text-left'></th>
                        <th className='text-center'>Tue</th>
                        <th className='text-left'></th>
                        <th className='text-center'>Wed</th>
                        <th className='text-left'></th>
                        <th className='text-center'>Thu</th>
                        <th className='text-left'></th>
                        <th className='text-center'>Fri</th>
                        <th className='text-left'></th>
                        <th className='text-center'>Sat</th>
                        <th className='text-left'></th>
                        <th className='text-center'>Sun</th>
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
