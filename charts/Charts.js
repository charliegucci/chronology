import { useState } from 'react'
import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChartWrapper from './ChartWrapper';
import WBSDropdown from './WBSDropdown';

function App() {

  const [wbs1, setWBS1] = useState("All");  
  const [wbs2, setWBS2] = useState(null);
  const [wbs1_menu] = useState(["01-On", "02-Off", "03-Non Productive", "All"]);
  const [wbs2_menu, setWBS2_menu] = useState([]);

  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Chronology</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}><WBSDropdown wbsSelected1={setWBS1} 
                                    wbsSelected2={setWBS2} 
                                    wbs_menu1={wbs1_menu} 
                                    wbs_menu2={wbs2_menu} 
                                    set_wbs_menu2={setWBS2_menu}/></Col>
        </Row>
        <Row>
          <Col xs={12}><ChartWrapper wbs1={wbs1} wbs2={wbs2}/></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;