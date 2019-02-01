import React, { Component } from "react";

import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import SensorsTab from "tabs/SensorsTab";

export default class Sensors extends Component {
  render() {
    return (
      <Tabs id="weather-tabs" bsStyle="pills" mountOnEnter unmountOnExit>
        <Tab title="Sensors" eventKey={1} key={1}>
          <SensorsTab />
        </Tab>
      </Tabs>
    );
  }
}
