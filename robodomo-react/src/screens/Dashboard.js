import React, { useState } from "react";

import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import DashboardTab from "tabs/DashboardTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("dashboardTabState") || "1"
  );
  const changeTab = eventKey => {
    localStorage.setItem("dashboardTabState", eventKey);
    setActiveTab(eventKey);
  };
  return (
    <Tabs
      id="dashboard-tabs"
      onSelect={changeTab}
      activeKey={activeTab}
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
};
export default Dashboard;
