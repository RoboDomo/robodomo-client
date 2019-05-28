import React, { useState, useEffect } from "react";
import MQTT from "lib/MQTT";

const formatTime = (seconds, trim = true) => {
  const d = new Date(null);
  d.setSeconds(seconds);
  const formatted = d.toISOString().substr(11, 8);
  if (trim && formatted.substr(0, 3) === "00:") {
    return formatted.substr(3);
  } else {
    return formatted;
  }
};

const AppleTV = ({ device }) => {
  const topic = "appletv/" + device + "/status";

  const [elapsedTime, setElapsedTime] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const onInfoChange = (topic, message) => {
      console.warn("onInfoChange", topic, message);
      if (!message) {
        setElapsedTime(null);
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
  }, [topic]);

  const renderPlaybackState = () => {
    if (!info) {
      return null;
    }
    if (info.duration) {
      return (
        <>
          <div style={{ fontSize: 10 }}>{info.title}</div>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} / {formatTime(info.duration)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  return <div>{renderPlaybackState()}</div>;
};

export default AppleTV;
