import { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const useWeather = zip => {
  const Config = useConfig();

  const [forecast, setForecast] = useState(null);
  const [now, setNow] = useState(null);
  const [astronomy, setAstronomy] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [city, setCity] = useState(null);

  //
  const handleForecastChange = (topic, message) => {
    setForecast(message);
  };

  //
  const handleNowChange = (topic, message) => {
    setNow(message);
  };

  //
  const handleCityChange = (topic, message) => {
    setCity(message);
  };

  //
  const handleAstronomyChange = (topic, message) => {
    setAstronomy(message);
  };

  //
  const handleHourlyChange = (topic, message) => {
    setHourly(message);
  };

  useEffect(() => {
    const status_topic = `${Config.mqtt.weather}/${zip}/status/`;
    if (zip) {
      MQTT.subscribe(status_topic + "forecast", handleForecastChange);
      MQTT.subscribe(status_topic + "observation", handleNowChange);
      MQTT.subscribe(status_topic + "astronomy", handleAstronomyChange);
      MQTT.subscribe(status_topic + "hourly", handleHourlyChange);
      MQTT.subscribe(status_topic + "display_city", handleCityChange);
    }
    return () => {
      if (zip) {
        MQTT.unsubscribe(status_topic + "forecast", handleForecastChange);
        MQTT.unsubscribe(status_topic + "observation", handleNowChange);
        MQTT.unsubscribe(status_topic + "astronomy", handleAstronomyChange);
        MQTT.unsubscribe(status_topic + "hourly", handleHourlyChange);
        MQTT.unsubscribe(status_topic + "display_city", handleCityChange);
      }
    };
  }, [Config.mqtt.weather, zip]);

  return {
    now: now || {},
    display_city: city,
    forecast: forecast,
    hourly: hourly,
    astronomy: astronomy,
  };
};

//
export default useWeather;
