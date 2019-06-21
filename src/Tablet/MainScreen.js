/**
 * Tablet MainScreen component
 *
 * Implements the top bar as tabs and renders app content below
 */

import React, { useState, useEffect } from "react";

import {
  //  Grid,
  Navbar,
  TabContainer,
  TabContent,
  TabPane,
  Nav,
} from "react-bootstrap";

import Dashboard from "Tablet/Dashboard/Dashboard";
import { MdDashboard } from "react-icons/md";
import Theater from "Tablet/Theater/Theater";
import { IoIosTv } from "react-icons/io";
import Weather from "Tablet/Weather/Weather";
import { TiWeatherCloudy } from "react-icons/ti";
import Nest from "Tablet/Nest/Nest";
import { TiThermometer } from "react-icons/ti";
import Sensors from "Tablet/Sensors/Sensors";
import { IoIosAnalytics } from "react-icons/io";
import Autelis from "Tablet/Autelis/Autelis";
import { FaSwimmingPool } from "react-icons/fa";
import SmartThings from "Tablet/SmartThings/SmartThings";
import { MdMenu } from "react-icons/md";

const LOCALSTORAGE_KEY = "mainTabState";

// TODO: get these from Config/Mongo (the order, which are enabled, etc.).
const tabInfo = {
  dashboard: 1,
  1: "dashboard",
  theater: 2,
  2: "theater",
  weather: 3,
  3: "weather",
  nest: 4,
  4: "nest",
  sensors: 5,
  5: "sensors",
  autelis: 6,
  6: "autelis",
  smartthings: 7,
  7: "smartthings",
};

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "1");
  useEffect(() => {
    window.addEventListener(
      "hashchange",
      () => {
        const hash = window.location.hash.substr(1),
          info = tabInfo[hash];
        localStorage.setItem(LOCALSTORAGE_KEY, info);
        setActiveTab(info);
      },
      false
    );
  }, []);

  return (
    <div style={{ width: 1024, height: 768, margin: "auto" }}>
      <div style={{ marginTop: 56 }}>
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
            <TabPane mountOnEnter unmountOnExit eventKey={7}>
              <SmartThings />
            </TabPane>
          </TabContent>
          <Navbar
            fixed="top"
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
        </TabContainer>
      </div>
    </div>
  );
};

export default MainScreen;
