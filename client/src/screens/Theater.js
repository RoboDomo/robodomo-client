import React, { Component } from "react";

import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import TheaterTab from "tabs/TheaterTab";

export default class Theater extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: localStorage.getItem("theaterTabState") || "0"
    };
  }
  changeTab(eventKey) {
    localStorage.setItem("theaterTabState", eventKey);
    this.setState({ activeTab: eventKey });
  }
  render() {
    const activeTab = this.state.activeTab;
    return (
      <Tabs
        id="theater-tabs"
        onSelect={this.changeTab}
        activeKey={activeTab}
        bsStyle="pills"
        mountOnEnter
        unmountOnExit
      >
        {Config.theaters.map(theater => {
          //          console.log("theater", theater);
          return (
            <Tab
              title={theater.title}
              eventKey={theater.key}
              key={theater.key}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              <TheaterTab theater={theater} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}
