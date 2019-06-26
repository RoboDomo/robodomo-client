import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { IoIosTv } from "react-icons/io";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiThermometer } from "react-icons/ti";
import { IoIosAnalytics } from "react-icons/io";
import { FaSwimmingPool } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

import tabInfo from "./tabs";

const Navigation = ({ activeTab }) => (
  <Navbar
    bg="primary"
    variant="dark"
    onSelect={tab => {
      window.location.hash = "#" + tabInfo[tab];
    }}
  >
    <Navbar.Brand
      onClick={() => {
        window.location.reload();
      }}
    >
      RoboDomo
    </Navbar.Brand>
    <Nav className="mr-auto" defaultActiveKey={activeTab}>
      <Nav.Item>
        <Nav.Link eventKey={1}>
          <MdDashboard /> Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Link eventKey={2}>
        <IoIosTv /> Theater
      </Nav.Link>
      <Nav.Link eventKey={3}>
        <TiWeatherCloudy /> Weather
      </Nav.Link>
      <Nav.Link eventKey={4}>
        <TiThermometer />
        Nest
      </Nav.Link>
      <Nav.Link eventKey={5}>
        <IoIosAnalytics /> Sensors
      </Nav.Link>
      <Nav.Link eventKey={6}>
        <FaSwimmingPool /> Pool/Spa
      </Nav.Link>
      <Nav.Link eventKey={7}>
        <MdMenu /> SmartThings
      </Nav.Link>
    </Nav>
  </Navbar>
);

export default Navigation;
