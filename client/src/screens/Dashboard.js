import React, { Component } from "react";

import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import DashboardTab from "tabs/DashboardTab";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeState: localStorage.getItem("dashboardTabState") || "0"
    };
  }
  changeTab(eventKey) {
    localStorage.setItem("dashboardTabState", eventKey);
    this.setState({ activeTab: eventKey });
  }
  render() {
    return (
      <Tabs
        id="dashboard-tabs"
        onSelect={this.changeTab}
        activeKey={this.state.activeTab}
        bsStyle="pills"
        mountOnEnter
        unmountOnExit
      >
        {Config.dashboards.map(dashboard => {
          return (
            <Tab
              eventKey={dashboard.key}
              key={dashboard.key}
              title={dashboard.title}
            >
              <DashboardTab dashboard={dashboard} />
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}
