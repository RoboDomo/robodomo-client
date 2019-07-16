import React, { useState } from "react";
import { IonContent } from "@ionic/react";


import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import DashboardTab from "./DashboardTab";
import { Route } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("dashboardTabState") || "1");
  const config = useConfig();
  if (!config) {
    return null;
  }

  if (activeTab == null) {
    console.log("THERE IS NO ACTIVE TAB");
  } else {
    console.log("THIS IS THE ACTIVE TAB: ", activeTab);
  }
  //console.log("THIS IS THE SET ACTIVE TAB: ", setActiveTab)
  const changeTab = eventKey => {
    localStorage.setItem("dashboardTabState", eventKey);
    setActiveTab(eventKey);
  };
  return (
    <IonContent id="tab-dashboard">
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
    </IonContent>
  );
};

//
export default Dashboard;
