import React, { useState } from "react";

import {
  Navbar,
  Nav,
  TabContainer,
  TabContent,
  TabPane,
  NavItem
} from "react-bootstrap";

import { MdDashboard } from "react-icons/md";
import { IoIosTv } from "react-icons/io";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiThermometer } from "react-icons/ti";
import { IoIosAnalytics } from "react-icons/io";
import { FaSwimmingPool } from "react-icons/fa";

import Dashboard from "Dashboard/Dashboard";

const LOCALSTORAGE_KEY = "phoneTabState";
/**
 * Phone Top Level App (Main) Screen
 */
const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY) || "1"
  );
  console.log("height", window.outerHeight);
  return (
    <div style={{ marginTop: 50 }}>
      <TabContainer
        activeKey={parseInt(activeTab, 10)}
        id="mainTabs"
        variant="pills"
        mountOnEnter
        unmountOnExit
        onSelect={() => {}}
      >
        <TabContent>
          <TabPane eventKey={1}>
            <Dashboard />
          </TabPane>
          <TabPane eventKey={2}>2</TabPane>
          <TabPane eventKey={3}>3</TabPane>
          <TabPane eventKey={4}>4</TabPane>
          <TabPane eventKey={5}>5</TabPane>
          <TabPane eventKey={6}>6</TabPane>
        </TabContent>
      </TabContainer>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand>RoboDomo</Navbar.Brand>
      </Navbar>
      <Navbar
        bg="dark"
        variant="dark"
        fixed="bottom"
        onSelect={tab => {
          localStorage.setItem(LOCALSTORAGE_KEY, tab);
          setActiveTab(tab);
          console.log("eventKey");
        }}
      >
        <Nav justify variant="tabs" defaultActiveKey={activeTab}>
          <Nav.Item>
            <Nav.Link eventKey={1} href="#" style={{ margin: 8 }}>
              <MdDashboard />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={2} href="#" style={{ margin: 8 }}>
              <IoIosTv />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={3} href="#" style={{ margin: 8 }}>
              <TiWeatherCloudy />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={4} href="#" style={{ margin: 8 }}>
              <TiThermometer />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={5} href="#" style={{ margin: 8 }}>
              <IoIosAnalytics />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={6} href="#" style={{ margin: 8 }}>
              <FaSwimmingPool />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default MainScreen;
