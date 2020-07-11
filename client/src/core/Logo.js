import React, { useState } from 'react';
import { Navbar } from 'reactstrap';

const Logo = () => {
  const [navbarColor, setnavbarColor] = useState(' navbar-transparent');

  return (
    <Navbar className={'fixed-top' + navbarColor} color='white' expand='lg'>
      <span>
        <i className='now-ui-icons loader_gear spin'>
          {' '}
          <i className='now-ui-icons loader_gear spin'> </i>
        </i>
      </span>

      <span> Chronology</span>
    </Navbar>
  );
};

export default Logo;
