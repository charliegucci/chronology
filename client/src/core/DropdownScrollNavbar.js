import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout } from '../auth/helpers';
import {
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  UncontrolledTooltip
} from 'reactstrap';
// Navbar
const DropdownScrollNavbar = ({ history }) => {
  //sets the state for Styling
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState(' navbar-transparent');

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor('');
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor(' navbar-transparent');
      }
    };
    window.addEventListener('scroll', updateNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id='bodyClick'
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={'fixed-top' + navbarColor} color='white' expand='lg'>
        <Container>
          <UncontrolledDropdown className='button-dropdown'>
            <DropdownToggle
              caret
              tag='a'
              data-toggle='dropdown'
              id='navbarDropdown'
              onClick={(e) => e.preventDefault()}>
              <span className='button-bar'></span>
              <span className='button-bar'></span>
              <span className='button-bar'></span>
            </DropdownToggle>
          </UncontrolledDropdown>
          <div className='navbar-translate'>
            <NavbarBrand id='navbar-brand'>Chronology</NavbarBrand>

            <button
              onClick={() => {
                document.documentElement.classList.toggle('nav-open');
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className='navbar-toggler'>
              <span className='navbar-toggler-bar top-bar'></span>
              <span className='navbar-toggler-bar middle-bar'></span>
              <span className='navbar-toggler-bar bottom-bar'></span>
            </button>
          </div>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className='ml-auto' id='ceva' navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink1'
                  nav
                  to='/profile'
                  tag={Link}
                  onClick={() => history.push('/profile')}>
                  <i className='now-ui-icons emoticons_satisfied'></i>
                  <p>Profile</p>
                </DropdownToggle>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink1'
                  nav
                  to='/user/timesheet'
                  tag={Link}
                  onClick={() => history.push('/user/timesheet')}>
                  <i className='now-ui-icons tech_watch-time'></i>
                  <p>TimeSheet</p>
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i
                    aria-hidden={true}
                    className='now-ui-icons ui-1_calendar-60'></i>
                  <p id='schedule'>SCHEDULE</p>
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i
                    aria-hidden={true}
                    className='now-ui-icons ui-2_settings-90'></i>
                  <p id='parts'>PARTS</p>
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i className='now-ui-icons design_bullet-list-67'></i>
                  <p id='task'>TASK</p>
                </DropdownToggle>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i className='now-ui-icons files_single-copy-04'></i>
                  <p id='data_register'>DATA REGISTER</p>
                </DropdownToggle>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  color='default'
                  data-toggle='dropdown'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => history.push('/user/chart')}>
                  <i className='now-ui-icons business_chart-bar-32'></i>
                  <p>CHARTS</p>
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledTooltip placement='bottom' target='schedule'>
                Coming Soon!{' '}
                <span role='img' aria-labelledby='schedule'>
                  👨🏽‍💻
                </span>
              </UncontrolledTooltip>
              <UncontrolledTooltip placement='bottom' target='task'>
                Coming Soon!{' '}
                <span role='img' aria-labelledby='task'>
                  👨🏽‍💻
                </span>
              </UncontrolledTooltip>
              <UncontrolledTooltip placement='bottom' target='data_register'>
                Coming Soon!{' '}
                <span role='img' aria-labelledby='data_register'>
                  👨🏽‍💻
                </span>
              </UncontrolledTooltip>
              <UncontrolledTooltip placement='bottom' target='parts'>
                Coming Soon!{' '}
                <span role='img' aria-labelledby='parts'>
                  👨🏽‍💻
                </span>
              </UncontrolledTooltip>
              <DropdownToggle
                color='default'
                data-toggle='dropdown'
                id='navbarDropdownMenuLink1'
                nav
                onClick={() => {
                  signout(() => {
                    history.push('/');
                  });
                }}>
                <i className='now-ui-icons design_app'></i>
                <p>Logout</p>
              </DropdownToggle>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default withRouter(DropdownScrollNavbar);
