import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";

import WeatherTab from "./WeatherTab";

const LOCALSTORAGE_KEY = "phoneWeatherTab";

const Weather = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "1");
  return (
    <Tabs
      id="weather-tabs"
      activeKey={activeTab}
      onSelect={tab => {
        localStorage.setItem(LOCALSTORAGE_KEY, tab);
        setActiveTab(tab);
      }}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {Config.weather.locations.map(location => {
        return (
          <Tab eventKey={location.name} key={location.name} title={location.name}>
            <WeatherTab location={location} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default Weather;
