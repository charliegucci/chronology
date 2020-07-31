import React from 'react';
import { Container } from 'reactstrap';

// Footer
const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <Container>
          <div className='copyright' id='copyright'>
            © {new Date().getFullYear()} by{' '}
            <a
              href='https://github.com/charliegucci/chronology'
              target='_blank'
              rel='noopener noreferrer'>
              Chronology
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
