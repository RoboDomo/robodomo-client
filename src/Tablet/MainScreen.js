/**
 * Tablet MainScreen component
 *
 * Implements the top bar as tabs and renders app content below
 */

import React, { useState, useEffect, lazy } from "react";
import { IonContent, IonApp } from "@ionic/react";

import { TabContainer, TabContent, TabPane } from "react-bootstrap";

import Dashboard from "Tablet/Dashboard/Dashboard";
import Theater from "Tablet/Theater/Theater";
import Weather from "Tablet/Weather/Weather";
import Nest from "Tablet/Nest/Nest";
import Sensors from "Tablet/Sensors/Sensors";
import Autelis from "Tablet/Autelis/Autelis";
import SmartThings from "Tablet/SmartThings/SmartThings";

import tabInfo from "./tabs";

const Navigation = lazy(() => import("./Navigation" /* webpackChunkName: "navigation" */));

const LOCALSTORAGE_KEY = "mainTabState";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "1");
  useEffect(() => {
    window.addEventListener(
      "hashchange",
      () => {
        const hash = window.location.hash.substr(1),
          info = tabInfo[hash];
        localStorage.setItem(LOCALSTORAGE_KEY, info);
        setActiveTab(info);
      },
      false
    );
  }, []);

  return (
    <IonApp>
      <IonContent id="main" style={{ "--color": "#aaaaaa" }}>
        <TabContainer
          id="mainTabs"
          variant="pills"
          montOnEnter
          unmountOnExit
          activeKey={parseInt(activeTab, 10)}
          onSelect={() => {}}
        >
          <Navigation activeTab={activeTab} />
          <TabContent>
            <TabPane mountOnEnter unmountOnExit eventKey={1}>
              <Dashboard />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={2}>
              <Theater />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={3}>
              <Weather />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={4}>
              <Nest />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={5}>
              <Sensors />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={6}>
              <Autelis />
            </TabPane>
            <TabPane mountOnEnter unmountOnExit eventKey={7}>
              <SmartThings />
            </TabPane>
          </TabContent>
        </TabContainer>
      </IonContent>
    </IonApp>
  );
};

export default MainScreen;
