import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import TheaterTab from "./TheaterTab";

const Theater = () => {
  const config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem("theaterTabState") || "0");

  if (!config) {
    return null;
  }
  return (
    <IonContent id="tab-theater">
      <Tabs
        id="theater-tabs"
        onSelect={eventKey => {
          localStorage.setItem("theaterTabState", eventKey);
          setActiveTab(eventKey);
        }}
        activeKey={activeTab}
        variant="pills"
        mountOnEnter
        unmountOnExit
      >
        {Array.isArray(config.theaters)
          ? config.theaters.map(theater => {
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
            })
          : null}
      </Tabs>
    </IonContent>
  );
};
export default Theater;
