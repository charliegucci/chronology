import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import * as WBSJSONData from './data/wbs.json';

const getWBSLevel2 = (data, level1) => {
  const wbslevel1 = [];
  const wbsOutput = [];

  data.default.forEach((element) => {
    if (element.code === level1) {
      wbslevel1.push(element.sub);
    }
  });

  if (wbslevel1[0]) {
    wbslevel1[0].forEach((element) => {
      wbsOutput.push(`${element.code}- ${element.title}`);
    });
  }

  return wbsOutput;
};

export default function WBSDropdown({
  wbsSelected1,
  wbsSelected2,
  wbs_menu1,
  wbs_menu2,
  set_wbs_menu2,
  setMode
}) {
  return (
    <Container>
      <Row>
        <Col sm={{ size: 'auto' }}>
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic' size='sm'>
              Level 1 WBS
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {wbs_menu1.map((wbs1, idx) => (
                <Dropdown.Item
                  key={idx}
                  onSelect={() => {
                    if (wbs1 === 'All') {
                      wbsSelected1('All');
                    } else {
                      if (idx >= 0 && idx <= 9) {
                        wbsSelected1(`0${idx + 1}`);
                      } else {
                        wbsSelected1(idx + 1);
                      }
                    }
                    set_wbs_menu2(
                      getWBSLevel2(WBSJSONData, wbs1.split('-')[0])
                    );
                    wbsSelected2(null);
                  }}>
                  {wbs1.toUpperCase()}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        </Row>
        <Row>
        <Col sm={{ size: 'auto' }}>
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic' size='sm'>
              Level 2 WBS
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {wbs_menu2.map((wbs2, idx) => (
                <Dropdown.Item
                  key={idx}
                  onSelect={() => {
                    if (idx >= 0 && idx <= 9) {
                      wbsSelected2(`0${idx + 1}`);
                    } else {
                      wbsSelected2(idx + 1);
                    }
                  }}>
                  {wbs2.toUpperCase()}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        </Row>
        <Row>
        <Col sm={{ size: 'auto' }}>
          <ButtonGroup>
            <Button onClick={() => setMode("dark")}>Dark</Button>
            <Button onClick={() => setMode("light")}>Light</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}
