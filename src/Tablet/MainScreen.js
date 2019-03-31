/**
 * Tablet MainScreen component
 *
 * Implements the top bar as tabs and renders app content below
 */

import React, { useState } from "react";

import {
  //  Grid,
  Navbar,
  TabContainer,
  TabContent,
  TabPane,
  Nav
} from "react-bootstrap";

import Dashboard from "screens/Dashboard";
import { MdDashboard } from "react-icons/md";
import Theater from "screens/Theater";
import { IoIosTv } from "react-icons/io";
import Weather from "screens/Weather";
import { TiWeatherCloudy } from "react-icons/ti";
import Nest from "screens/Nest";
import { TiThermometer } from "react-icons/ti";
import Sensors from "screens/Sensors";
import { IoIosAnalytics } from "react-icons/io";
import Autelis from "screens/Autelis";
import { FaSwimmingPool } from "react-icons/fa";

const LOCALSTORAGE_KEY = "mainTabState";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY) || "1"
  );
  return (
    <div style={{ width: 1024, height: 768, margin: "auto" }}>
      <div style={{ marginTop: 50 }}>
        <TabContainer
          id="mainTabs"
          variant="pills"
          montOnEnter
          unmountOnExit
          activeKey={parseInt(activeTab, 10)}
          onSelect={() => {}}
        >
          <TabContent>
            <TabPane mountOnEnter unmountOnExit eventKey={1}>
              <Dashboard />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={2}>
              <Theater />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={3}>
              <Weather />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={4}>
              <Nest />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={5}>
              <Sensors />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={6}>
              <Autelis />
            </TabPane>
          </TabContent>
          <Navbar
            fixed="top"
            bg="primary"
            variant="dark"
            onSelect={tab => {
              localStorage.setItem(LOCALSTORAGE_KEY, tab);
              setActiveTab(tab);
              console.log("eventKey");
            }}
          >
            <Navbar.Brand>RoboDomo</Navbar.Brand>
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
            </Nav>
          </Navbar>
        </TabContainer>
      </div>
    </div>
  );
};

export default MainScreen;
