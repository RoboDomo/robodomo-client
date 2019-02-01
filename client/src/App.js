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
import Thermostat from "screens/Thermostat";
import { TiThermometer } from "react-icons/ti";
import Sensors from "screens/Sensors";
import { IoIosAnalytics } from "react-icons/io";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: localStorage.getItem("mainTabState") || "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(tab) {
    localStorage.setItem("mainTabState", tab);
    this.setState({ activeTab: tab });
  }

  render() {
    console.log("activeTab", this.state.activeTab);
    console.dir(this.state.activeTab);
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
          activeKey={parseInt(this.state.activeTab, 10)}
          style={{
            width: 1024,
            height: 768,
            display: "flex",
            flexDirection: "column"
          }}
          onSelect={this.handleSelect}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ flexGrow: 1 }}>
              <TabContent>
                <TabPane mountOnEnter unmountOnExit eventKey={1}>
                  <Dashboard />
                </TabPane>
                <TabPane mountOnEnter unmountOnExit eventKey={2}>
                  <Weather />
                </TabPane>
                <TabPane mountOnEnter unmountOnExit eventKey={3}>
                  <Thermostat />
                </TabPane>
                <TabPane mountOnEnter unmountOnExit eventKey={4}>
                  <Sensors />
                </TabPane>
              </TabContent>
            </div>
            <div style={{ flexGrow: 0 }}>
              <Nav bsStyle="pills">
                <NavItem
                  style={{ width: 128, textAlign: "center" }}
                  eventKey={1}
                >
                  <MdDashboard size={24} />
                  <br />
                  Dashboard
                </NavItem>
                <NavItem
                  style={{ width: 128, textAlign: "center" }}
                  eventKey={2}
                >
                  <TiWeatherCloudy size={24} />
                  <br />
                  Weather
                </NavItem>
                <NavItem
                  style={{ width: 128, textAlign: "center" }}
                  eventKey={3}
                >
                  <TiThermometer size={24} />
                  <br />
                  Thermostat
                </NavItem>
                <NavItem
                  style={{ width: 128, textAlign: "center" }}
                  eventKey={4}
                >
                  <IoIosAnalytics size={24} />
                  <br />
                  Sensors
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
