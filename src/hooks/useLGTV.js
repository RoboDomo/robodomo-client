import { useState, useEffect } from "react";
import MQTT from "@/lib/MQTT";

const useLGTV = config => {
  const [power, setPower] = useState(null);
  const [input, setInput] = useState(null);
  const [foregroundApp, setForegroundApp] = useState(null);
  const [launchPoints, setLaunchPoints] = useState(null);

  const handlePower = (topic, message) => {
    if (message === true || message === false) {
      setPower(message ? "on" : "off");
    } else {
      setPower(message === "on");
    }
  };

  const handleForegroundApp = (topic, message) => {
    setForegroundApp(message);
  };

  const handleLaunchPoints = (topic, message) => {
    try {
      setLaunchPoints(JSON.parse(message));
    } catch (e) {
      setLaunchPoints(message);
    }
  };

  useEffect(() => {
    const hostname = config.device,
      status_topic = "lgtv/" + hostname + "/status";

    MQTT.subscribe(`${status_topic}/power`, handlePower);
    MQTT.subscribe(`${status_topic}/launchPoints`, handleLaunchPoints);
    MQTT.subscribe(`${status_topic}/foregroundApp`, handleForegroundApp);
    return () => {
      MQTT.unsubscribe(`${status_topic}/power`, handlePower);
      MQTT.unsubscribe(`${status_topic}/launchPoints`, handleLaunchPoints);
      MQTT.unsubscribe(`${status_topic}/foregroundApp`, handleForegroundApp);
    };
  }, [config.device]);

  useEffect(() => {
    if (
      !launchPoints ||
      !foregroundApp ||
      !foregroundApp.appId ||
      !launchPoints[foregroundApp.appId]
    ) {
      setInput("OFF");
      return;
    }
    const title = launchPoints[foregroundApp.appId].title;
    const lp = title || "unknown";
    const inp = power ? lp.replace(/\s+/, "").toLowerCase() : "OFF";

    setInput(inp);
  }, [foregroundApp, launchPoints, power]);

  return {
    ...config,
    //    reducer: r,
    power: power,
    input: input,
    foregroundApp: foregroundApp,
    launchPoints: launchPoints,
  };
};

//
export default useLGTV;
