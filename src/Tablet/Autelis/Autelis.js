import React, { useState } from "react";

import { Tabs, Tab } from "react-bootstrap";

import AutelisTab from "./AutelisTab";

import Config from "Config";

const LOCALSTORAGE_KEY = "autelisTabletTabState";

const Autelis = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY) || "0"
  );
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
      <Tab
        title={Config.autelis.device.toUpperCase()}
        eventKey="autelis"
        key="autelis"
      >
        <AutelisTab />
      </Tab>
    </Tabs>
  );
};

export default Autelis;
