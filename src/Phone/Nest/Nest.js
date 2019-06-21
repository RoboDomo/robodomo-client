import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import ThermostatTab from "./ThermostatTab";
import ProtectTab from "./ProtectTab";

const LOCALSTORAGE_KEY = "nestPhoneTabState";

const Nest = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "0");

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
          <Tab title={thermostat.name} eventKey={thermostat.name} key={thermostat.name}>
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

//
export default Nest;
