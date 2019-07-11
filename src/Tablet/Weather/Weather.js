import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import WeatherTab from "./WeatherTab";

const Weather = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem("weatherTabState") || "0");
  if (!Config) {
    return null;
  }
  const changeTab = eventKey => {
    localStorage.setItem("weatherTabState", eventKey);
    setActiveTab(eventKey);
  };
  return (
    <IonContent id="tab-weather">
      <Tabs
        id="weather-tabs"
        onSelect={changeTab}
        activeKey={activeTab}
        variant="pills"
        mountOnEnter
        unmountOnExit
      >
        {Config.weather.locations.map(location => {
          return (
            <Tab
              title={location.name}
              eventKey={location.name}
              key={location.name}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              <WeatherTab location={location} />
            </Tab>
          );
        })}
      </Tabs>
    </IonContent>
  );
};

//
export default Weather;
