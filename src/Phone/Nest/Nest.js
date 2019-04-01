import React, { useState } from "react";
import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import ThermostatTab from "Nest/ThermostatTab";
import ProtectTab from "Nest/ProtectTab";

const LOCALSTORAGE_KEY = "nestPhoneTabState";

const Nest = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY) || "0"
  );

  return (
    <Tabs
      id="nest-tabs"
      onSelect={eventKey => {
        localStorage.setItem(LOCALSTORAGE_KEY, eventKey);
        setActiveTab(eventKey);
      }}
      activeKey={activeTab}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {Config.nest.thermostats.map(thermostat => {
        return (
          <Tab
            title={thermostat.name}
            eventKey={thermostat.name}
            key={thermostat.name}
          >
            <ThermostatTab thermostat={thermostat} />
          </Tab>
        );
      })}
      {Config.nest.protects.map(protect => {
        return (
          <Tab title={protect.name} eventKey={protect.name} key={protect.name}>
            <ProtectTab sensor={protect} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default Nest;
