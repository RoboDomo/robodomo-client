import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tabs, Tab } from "react-bootstrap";

import AutelisTab from "./AutelisTab";

const LOCALSTORAGE_KEY = "autelisTabletTabState";

const Autelis = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "0");

  if (!Config) {
    return null;
  }

  return (
    <Tabs
      id="autelis-tabs"
      onSelect={eventKey => {
        localStorage.setItem(LOCALSTORAGE_KEY, eventKey);
        setActiveTab(eventKey);
      }}
      activeKey={activeTab}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      <Tab title={Config.autelis.device.toUpperCase()} eventKey="autelis" key="autelis">
        <AutelisTab />
      </Tab>
    </Tabs>
  );
};

export default Autelis;
