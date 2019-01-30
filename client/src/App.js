import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  TabContainer,
  TabContent,
  TabPane,
  Nav,
  NavItem
} from "react-bootstrap";

import Dashboard from "screens/Dashboard";
import { MdDashboard } from "react-icons/md";
import Weather from "screens/Weather";
import { TiWeatherCloudy } from "react-icons/ti";

class App extends Component {
  render() {
    return (
      <div
        style={{
          width: 1024,
          height: 768,
          margin: "auto",
          border: "1px solid black"
        }}
      >
        <TabContainer
          id="mainTabs"
          defaultActiveKey={1}
          style={{
            width: 1024,
            height: 768,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ flexGrow: 1 }}>
              <TabContent>
                <TabPane eventKey={1}>
                  <Dashboard />
                </TabPane>
                <TabPane eventKey={2}>
                  <Weather />
                </TabPane>
              </TabContent>
            </div>
            <div style={{ flexGrow: 0 }}>
              <Nav bsStyle="pills">
                <NavItem eventKey={1}>
                  <MdDashboard size={24} />
                </NavItem>
                <NavItem eventKey={2}>
                  <TiWeatherCloudy size={24} />
                </NavItem>
              </Nav>
            </div>
          </div>
        </TabContainer>
      </div>
    );
  }
}

export default App;
