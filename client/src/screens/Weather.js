import React, { Component } from "react";

import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import WeatherTab from "tabs/WeatherTab";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: localStorage.getItem("weatherTabState") || "0"
    };
  }
  changeTab(eventKey) {
    localStorage.setItem("weatherTabState", eventKey);
    this.setState({ activeTab: eventKey });
  }
  render() {
    const activeTab = this.state.activeTab;
    return (
      <Tabs
        id="weather-tabs"
        onSelect={this.changeTab}
        activeKey={activeTab}
        bsStyle="pills"
        mountOnEnter
        unmountOnExit
      >
        {Config.weather.locations.map(location => {
          return (
            <Tab
              title={location.name}
              eventKey={location.name}
              key={location.name}
            >
              <WeatherTab location={location} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}
