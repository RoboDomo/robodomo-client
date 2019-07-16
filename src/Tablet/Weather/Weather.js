import React from "react";
import TabbedView from "@/templates/TabbedView";

import WeatherTab from "./WeatherTab";

const Weather = () => (
  <TabbedView
    id="tab-weather"
    section="weather.locations"
    route="weather"
    sectionKey="device"
    titleKey="name"
    render={data => <WeatherTab zip={data.device} />}
  />
);

export default Weather;
