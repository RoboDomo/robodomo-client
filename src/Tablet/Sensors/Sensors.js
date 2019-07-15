import React from "react";
import {
  IonContent,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonLabel,
  IonTabButton,
} from "@ionic/react";
import { Route } from "react-router";
// TODO: remember tab state

import { Tab, Tabs } from "react-bootstrap";
import SensorsTab from "./SensorsTab";

const Sensors = () => {
  return (
    <IonContent id="tab-sensors">
      <Tabs id="sensors-tabs" variant="pills" mountOnEnter unmountOnExit>
        <Tab title="Sensors" eventKey={1} key={1}>
          <SensorsTab />
        </Tab>
      </Tabs>
    </IonContent>
  );
};

export default Sensors;

{/* <IonContent id="tab-dashboard">
<Tabs id="sensors-tabs" variant="pills" mountOnEnter unmountOnExit>
  <Tab title="Sensors" eventKey={1} key={1}>
    <SensorsTab />
  </Tab>
</Tabs>
</IonContent> */}
