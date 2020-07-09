/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container } from 'reactstrap';

// core components

function Footer() {
  return (
    <>
      <footer className='footer'>
        <Container>
          <div className='copyright' id='copyright'>
            © {new Date().getFullYear()} by{' '}
            <a href='#' target='_blank'>
              Chronology
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
