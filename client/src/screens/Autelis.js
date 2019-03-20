import React, { useState } from "react";

import { Tabs, Tab } from "react-bootstrap";

import AutelisTab from "tabs/AutelisTab";

import Config from "Config";

const Autelis = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("autelisTabState") || "0"
  );
  return (
    <Tabs
      id="autelis-tabs"
      onSelect={eventKey => {
        localStorage.setItem("autelisTabState", eventKey);
        setActiveTab(eventKey);
      }}
      activeKey={activeTab}
      bsStyle="pills"
      mountOnEnter
      unmountOnExit
    >
      <Tab title={Config.autelis.device} eventKey="autelis" key="autelis">
        <AutelisTab />
      </Tab>
    </Tabs>
  );
};
export default Autelis;
