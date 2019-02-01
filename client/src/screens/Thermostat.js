import React, { Component } from "react";
import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import ThermostatTab from "tabs/ThermostatTab";

export default class Thermostat extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: localStorage.getItem("thermostatTabState") || "0"
    };
  }
  changeTab(eventKey) {
    localStorage.setItem("thermostatTabState", eventKey);
    this.setState({ activeTab: eventKey });
  }
  render() {
    return (
      <Tabs
        id="thermostat-tabs"
        onSelect={this.changeTab}
        activeKey={this.state.activeTab}
        bsStyle="pills"
        mountOnEnter
        unmountOnExit
      >
        {Config.nest.thermostats.map(thermostat => {
          return (
            <Tab
              title={thermostat.name}
              eventKey={thermostat.name}
              key={thermostat.name}
            >
              <ThermostatTab config={thermostat} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}
