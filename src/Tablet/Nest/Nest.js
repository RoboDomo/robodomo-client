/**
 * Screen to control Nest products (thermostat, nest protect)
 */
import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import ThermostatTab from "./ThermostatTab";
import ProtectTab from "./ProtectTab";

const LOCALSTORAGE_KEY = "nestTabState";

const Nest = () => {
  const config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "0");

  if (!config || !config.nest) {
    return null;
  }

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
      {Array.isArray(config.nest.thermostats)
        ? config.nest.thermostats.map(thermostat => {
            return (
              <Tab title={thermostat.name} eventKey={thermostat.name} key={thermostat.name}>
                <ThermostatTab thermostat={thermostat} />
              </Tab>
            );
          })
        : null}
      {Array.isArray(config.nest.protects)
        ? config.nest.protects.map(protect => {
            return (
              <Tab title={protect.name} eventKey={protect.name} key={protect.name}>
                <ProtectTab sensor={protect} />
              </Tab>
            );
          })
        : null}
    </Tabs>
  );
};

export default Nest;
