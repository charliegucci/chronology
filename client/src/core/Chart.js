import React from 'react';
import Charts from '../charts/Charts';
import DropdownScrollNavbar from '../core/DropdownScrollNavbar';
import Footer from '../core/Footer';
import { Container, Row } from 'reactstrap';

const Chart = () => {
  return (
    <div className='cd-section' id='contact-us'>
      <div
        className='contactus-1 section-image'
        style={{
          backgroundColor: '#1E1D2D'
        }}>
        <DropdownScrollNavbar />
        <Container>
          <Row
            style={{
              width: '1250px',
              paddingTop: '3rem',
              paddingBottom: '3rem'
            }}>
            <Charts />
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
};
export default Chart;
