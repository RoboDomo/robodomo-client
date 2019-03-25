import React, { useState } from "react";

import {
  Navbar,
  Nav,
  NavItem,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

import { MdDashboard } from "react-icons/md";
import { IoIosTv } from "react-icons/io";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiThermometer } from "react-icons/ti";
import { IoIosAnalytics } from "react-icons/io";
import { FaSwimmingPool } from "react-icons/fa";
/**
 * Phone Top Level App (Main) Screen
 */
const MainScreen = () => {
  console.log("height", window.outerHeight);
  return (
    <div style={{ marginTop: 50 }}>
      <Navbar fluid inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>RoboDomo</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <ListGroup style={{ height: "100%" }}>
        <ListGroupItem>Dashboards</ListGroupItem>
        <ListGroupItem>Theater</ListGroupItem>
        <ListGroupItem>Weather</ListGroupItem>
        <ListGroupItem>Nest</ListGroupItem>
        <ListGroupItem>Sensors</ListGroupItem>
        <ListGroupItem>Pool/Spa</ListGroupItem>
      </ListGroup>
      <Navbar inverse fluid fixedBottom>
        <Nav bsStyle="pills" style={{ textAlign: "center" }}>
          <NavItem eventKey={1} href="#" style={{ margin: 8 }}>
            <MdDashboard />
          </NavItem>
          <NavItem eventKey={2} href="#" style={{ margin: 8 }}>
            <IoIosTv />
          </NavItem>
          <NavItem eventKey={3} href="#" style={{ margin: 8 }}>
            <TiWeatherCloudy />
          </NavItem>
          <NavItem eventKey={4} href="#" style={{ margin: 8 }}>
            <TiThermometer />
          </NavItem>
          <NavItem eventKey={5} href="#" style={{ margin: 8 }}>
            <IoIosAnalytics />
          </NavItem>
          <NavItem eventKey={6} href="#" style={{ margin: 8 }}>
            <FaSwimmingPool />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
  return <div>Phone</div>;
};

export default MainScreen;
