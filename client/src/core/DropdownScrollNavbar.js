import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout } from '../auth/helpers';
import Logo from '../core/Logo';

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip
} from 'reactstrap';

const DropdownScrollNavbar = ({ history }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState(' navbar-transparent');
  const [buyButtonColor, setBuyButtonColor] = useState('neutral');
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor('');
        setBuyButtonColor('info');
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor(' navbar-transparent');
        setBuyButtonColor('neutral');
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
              href='#pablo'
              id='navbarDropdown'
              onClick={(e) => e.preventDefault()}>
              <span className='button-bar'></span>
              <span className='button-bar'></span>
              <span className='button-bar'></span>
            </DropdownToggle>
            <DropdownMenu aria-labelledby='navbarDropdown'>
              <DropdownItem header>Dropdown header</DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Action
              </DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Another action
              </DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Something else here
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                Separated link
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                One more separated link
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className='navbar-translate'>
            <NavbarBrand to='/' tag={Link} id='navbar-brand'>
              Chronology
            </NavbarBrand>
            <UncontrolledTooltip target='navbar-brand'>
              Designed by Chronology. Coded by Jeb & Wil
            </UncontrolledTooltip>
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
                  caret
                  color='default'
                  data-toggle='dropdown'
                  href='#'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i className='now-ui-icons tech_watch-time'></i>
                  <p>TimeSheet</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby='navbarDropdownMenuLink1' right>
                  <DropdownItem to='/' tag={Link}>
                    <i className='now-ui-icons design_image'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/index' tag={Link}>
                    <i className='now-ui-icons business_chart-pie-36'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem href='#' target='_blank'>
                    <i className='now-ui-icons design_bullet-list-67'></i>
                    Action
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  href='#pablo'
                  id='navbarDropdownMenuLink'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i
                    aria-hidden={true}
                    className='now-ui-icons ui-1_calendar-60'></i>
                  <p>SCHEDULE</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby='navbarDropdownMenuLink' right>
                  <DropdownItem to='/sections#headers' tag={Link}>
                    <i className='now-ui-icons shopping_box'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#features' tag={Link}>
                    <i className='now-ui-icons ui-2_settings-90'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#blogs' tag={Link}>
                    <i className='now-ui-icons text_align-left'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#teams' tag={Link}>
                    <i className='now-ui-icons sport_user-run'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#projects' tag={Link}>
                    <i className='now-ui-icons education_paper'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#pricing' tag={Link}>
                    <i className='now-ui-icons business_money-coins'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#testimonials' tag={Link}>
                    <i className='now-ui-icons ui-2_chat-round'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/sections#contact-us' tag={Link}>
                    <i className='now-ui-icons tech_mobile'></i>
                    Action
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  href='#pablo'
                  id='navbarDropdownMenuLink'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i
                    aria-hidden={true}
                    className='now-ui-icons ui-2_settings-90'></i>
                  <p>PARTS</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby='navbarDropdownMenuLink' right>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons business_bulb-63'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons text_align-left'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons design_bullet-list-67'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons location_pin'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons education_paper'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons users_circle-08'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons business_money-coins'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons shopping_shop'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons shopping_bag-16'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons users_single-02'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/'>
                    <i className='now-ui-icons tech_mobile'></i>
                    Action
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  href='#pablo'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i className='now-ui-icons design_bullet-list-67'></i>
                  <p>TASK</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby='navbarDropdownMenuLink1' right>
                  <DropdownItem to='/' tag={Link}>
                    <i className='now-ui-icons design_image'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/index' tag={Link}>
                    <i className='now-ui-icons business_chart-pie-36'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem href='#' target='_blank'>
                    <i className='now-ui-icons design_bullet-list-67'></i>
                    Action
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav></UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  href='#pablo'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i className='now-ui-icons files_single-copy-04'></i>
                  <p>DATA REGISTER</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby='navbarDropdownMenuLink1' right>
                  <DropdownItem to='/' tag={Link}>
                    <i className='now-ui-icons design_image'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/index' tag={Link}>
                    <i className='now-ui-icons business_chart-pie-36'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem href='#' target='_blank'>
                    <i className='now-ui-icons design_bullet-list-67'></i>
                    Action
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav></UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  href='#pablo'
                  id='navbarDropdownMenuLink1'
                  nav
                  onClick={(e) => e.preventDefault()}>
                  <i className='now-ui-icons business_chart-bar-32'></i>
                  <p>CHARTS</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby='navbarDropdownMenuLink1' right>
                  <DropdownItem to='/' tag={Link}>
                    <i className='now-ui-icons design_image'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem to='/index' tag={Link}>
                    <i className='now-ui-icons business_chart-pie-36'></i>
                    Action
                  </DropdownItem>
                  <DropdownItem href='#' target='_blank'>
                    <i className='now-ui-icons design_bullet-list-67'></i>
                    Action
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav></UncontrolledDropdown>
              <UncontrolledDropdown nav></UncontrolledDropdown>
              <DropdownToggle
                color='default'
                data-toggle='dropdown'
                href='#pablo'
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
