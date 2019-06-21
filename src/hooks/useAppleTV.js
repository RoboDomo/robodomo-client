import React, { useState, useEffect } from "react";

import MQTT from "@/lib/MQTT";

const useAppleTV = device => {
  const [elapsedTime, setElapsedTime] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const topic = "appletv/" + device + "/status";

    const onInfoChange = (topic, message) => {
      if (!message) {
        setElapsedTime(null);
        setInfo(null);
      } else {
        let msg;
        try {
          msg = JSON.parse(message);
        } catch (e) {
          msg = message;
        }
        setInfo(prev => ({ ...prev, ...msg }));
      }
    };

    const onTimeChange = (topic, message) => {
      setElapsedTime(message);
    };

    MQTT.subscribe(topic + "/info", onInfoChange);
    MQTT.subscribe(topic + "/elapsedTime", onTimeChange);
    return () => {
      MQTT.unsubscribe(topic + "/info", onInfoChange);
      MQTT.unsubscribe(topic + "/elapsedTime", onTimeChange);
    };
  }, [device]);

  return {
    device: device,
    info: info,
    elapsedTime: elapsedTime,
  };
};

//
export default useAppleTV;
