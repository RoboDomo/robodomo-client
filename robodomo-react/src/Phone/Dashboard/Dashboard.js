import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Config from "Config";

import DashboardTab from "Dashboard/DashboardTab";

const LOCALSTORAGE_KEY = "phoneDashboardTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY) || "1"
  );
  return (
    <Tabs
      id="dashboard-tabs"
      activeKey={activeTab}
      onSelect={tab => {
        localStorage.setItem(LOCALSTORAGE_KEY, tab);
        setActiveTab(tab);
      }}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {Config.dashboards.map(dashboard => {
        console.log("MAP ", dashboard);
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
