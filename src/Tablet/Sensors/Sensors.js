import React from "react";
import { IonContent } from "@ionic/react";
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
