import React, { useState, useEffect } from "react";
import MQTT from "lib/MQTT";

const appName = n => {
  if (n === "com.google.ios.youtube") {
    return "YouTube";
  }
  return n;
};

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
      if (!message) {
        setElapsedTime(null);
      } else {
        if (message.position) {
          setElapsedTime(message.position);
        }
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
  }, []);

  const renderPlaybackState = () => {
    if (!info) {
      return null;
    }
    console.log("info", info);
    if (info.totalTime) {
      return (
        <>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} /{" "}
          {formatTime(info.totalTime)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  if (!info) {
    return <div>Not Playing</div>;
  }

  const app = appName(info.appDisplayName || info.appBundleIdentifier);
  return (
    <div style={{ height: undefined, textAlign: "center", marginBottom: 4 }}>
      <div style={{ fontSize: 16 }}>{app}</div>
      <div>
        {info.title}
        <br />
        <div style={{ fontWeight: "bold" }}>{renderPlaybackState()}</div>
      </div>
    </div>
  );
};

export default AppleTV;
