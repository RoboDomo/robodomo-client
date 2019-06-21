import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import DashboardTab from "./DashboardTab";

const Dashboard = () => {
  const config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem("dashboardTabState") || "1");
  const changeTab = eventKey => {
    localStorage.setItem("dashboardTabState", eventKey);
    setActiveTab(eventKey);
  };
  return (
    <Tabs
      id="dashboard-tabs"
      onSelect={changeTab}
      activeKey={activeTab}
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
export default Dashboard;
