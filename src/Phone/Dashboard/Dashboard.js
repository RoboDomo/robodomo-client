import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";

import DashboardTab from "./DashboardTab";

const LOCALSTORAGE_KEY = "phoneDashboardTab";

const Dashboard = () => {
  const config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "1");

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
      {config.dashboards.map(dashboard => {
        return (
          <Tab eventKey={dashboard.key} key={dashboard.key} title={dashboard.title}>
            <DashboardTab dashboard={dashboard} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

//
export default Dashboard;
