import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";
import { Tab, Tabs } from "react-bootstrap";

import TheaterTab from "./TheaterTab";

const LOCALSTORAGE_KEY = "phoneTheaterTab";

const Theater = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "1");
  return (
    <Tabs
      id="theater-tabs"
      activeKey={activeTab}
      onSelect={tab => {
        localStorage.setItem(LOCALSTORAGE_KEY, tab);
        setActiveTab(tab);
      }}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {Config.theaters.map(theater => {
        return (
          <Tab eventKey={theater.key} key={theater.key} title={theater.title}>
            <TheaterTab theater={theater} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default Theater;
