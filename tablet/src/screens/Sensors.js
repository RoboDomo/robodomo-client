import React /* useState*/ from "react";

// TODO: remember tab state

//import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import SensorsTab from "tabs/SensorsTab";

const Sensors = () => {
  return (
    <Tabs id="weather-tabs" bsStyle="pills" mountOnEnter unmountOnExit>
      <Tab title="Sensors" eventKey={1} key={1}>
        <SensorsTab />
      </Tab>
    </Tabs>
  );
};
export default Sensors;
