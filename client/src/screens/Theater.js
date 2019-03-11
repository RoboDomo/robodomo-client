import React, { useState } from "react";

import Config from "Config";

import { Tab, Tabs } from "react-bootstrap";
import TheaterTab from "tabs/TheaterTab";

export default () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("theaterTabState") || "0"
  );
  const changeTab = eventKey => {
    localStorage.setItem("theaterTabState", eventKey);
    setActiveTab(eventKey);
  };

  return (
    <Tabs
      id="theater-tabs"
      onSelect={changeTab}
      activeKey={activeTab}
      bsStyle="pills"
      mountOnEnter
      unmountOnExit
    >
      {Config.theaters.map(theater => {
        //          console.log("theater", theater);
        return (
          <Tab
            title={theater.title}
            eventKey={theater.key}
            key={theater.key}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <TheaterTab theater={theater} />
          </Tab>
        );
      })}
    </Tabs>
  );
};
