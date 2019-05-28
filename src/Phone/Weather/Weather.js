import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Config from "Config";

import WeatherTab from "./WeatherTab";

const LOCALSTORAGE_KEY = "phoneWeatherTab";

const Weather = () => {
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
