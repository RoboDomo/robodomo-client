import React, { useState } from "react";
import {
  IonContent,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonTab,
} from "@ionic/react";

import Aux from "../../../src/Tablet/hoc/Aux";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import DashboardTab from "./DashboardTab";
import { Route } from "react-router-dom";
import Sensors from '@/Phone/Sensors/Sensors';

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
    <IonTabs id="dashboard-tabs" activeTab>
      {config.dashboards.map(dashboard => {
        return (
          <IonRouterOutlet name={dashboard.key}>
            <Route component={DashboardTab} />
          </IonRouterOutlet>
        );
      })}
      <IonTabBar slot="top">
        {config.dashboards.map(dashboard => {
          return (
            <IonTabButton tab={dashboard.key}>
              <IonLabel>{dashboard.title}</IonLabel>
            </IonTabButton>
          );
        })}
      </IonTabBar>
    </IonTabs>
  );
};

//
export default Dashboard;
