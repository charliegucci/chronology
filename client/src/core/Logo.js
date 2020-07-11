import React, { useState } from 'react';
import { Navbar } from 'reactstrap';

const Logo = () => {
  const [navbarColor, setnavbarColor] = useState(' navbar-transparent');

  return (
    <div className='text-center '>
      <span>
        <i className='now-ui-icons loader_gear spin'>
          {' '}
          <i className='now-ui-icons loader_gear spin'> </i>
        </i>
      </span>
      <div style={{ paddingTop: '1rem' }}>
        <h5>CHRONOLOGY</h5>
      </div>
    </div>
  );
};

export default Logo;
