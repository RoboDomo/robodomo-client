import React, { useState } from "react";
import {
  IonContent,
  IonApp,
  IonPage,
  IonTab,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";

import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import DashboardTab from "./DashboardTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("dashboardTabState") || "1");
  const config = useConfig();
  if (!config) {
    return null;
  }
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
