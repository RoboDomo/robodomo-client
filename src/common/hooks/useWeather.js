import { useState, useEffect, useReducer } from "react";
import MQTT from "lib/MQTT";
import Config from "Config";

const useWeather = zip => {
  const status_topic = `${Config.mqtt.weather}/${zip}/status/`;

  const [forecast, setForecast] = useState(null);
  const [now, setNow] = useState(null);
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

  useEffect(() => {
    MQTT.subscribe(status_topic + "forecast", handleForecastChange);
    MQTT.subscribe(status_topic + "now", handleNowChange);
    MQTT.subscribe(status_topic + "display_city", handleCityChange);
    return () => {
      MQTT.unsubscribe(status_topic + "forecast", handleForecastChange);
      MQTT.unsubscribe(status_topic + "now", handleNowChange);
      MQTT.unsubscribe(status_topic + "display_city", handleCityChange);
    };
  }, [zip]);

  return {
    now: now || {},
    display_city: city,
    forecast: forecast
  };
};

export default useWeather;
