import { useState, useEffect, useRef, useReducer } from "react";
import MQTT from "lib/MQTT";
import Config from "Config";

const useDenon = config => {
  const [power, setPower] = useState(null);
  const [input, setInput] = useState(null);
  const [masterVolume, setMasterVolume] = useState(null);
  const [centerVolume, setCenterVolume] = useState(null);
  const [surroundMode, setSurroundMode] = useState(null);

  const topic = `${Config.mqtt.denon}/${config.device}/status/`,
    set_topic = topic.replace("status", "set") + "command";

  const mute = useRef(null);
  const reducer = useRef((state, action) => {
    switch (action.type.toLowerCase()) {
      case "mute":
        const mu = mute.current ? "MUOFF" : "MUON";
        MQTT.publish(set_topic, mu);
        mute.current = !mute;
        break;
      case "masterup":
        MQTT.publish(set_topic, "MVUP");
        break;
      case "masterdown":
        MQTT.publish(set_topic, "MVDOWN");
        break;
      case "centerup":
        MQTT.publish(set_topic, "CVC UP");
        break;
      case "centerdown":
        MQTT.publish(set_topic, "CVC DOWN");
        break;
      case "auto":
        MQTT.publish(set_topic, "MSAUTO");
        break;
      case "movie":
        MQTT.publish(set_topic, "MSMOVIE");
        break;
      case "music":
        MQTT.publish(set_topic, "MSMUSIC");
        break;
      case "poweron":
        MQTT.publish(set_topic, "PWON");
        break;
      case "standby":
        MQTT.publish(set_topic, "PWSTANDBY");
        break;
      default:
        break;
    }
    return state;
  });

  const [, d] = useReducer(reducer.current);
  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (~topic.indexOf("SI")) {
        setInput(message);
      } else if (~topic.indexOf("PW")) {
        setPower(message.toUpperCase() === "ON");
      } else if (~topic.indexOf("MU")) {
        const st = message.toUpperCase() === "ON";
        mute.current = st;
      } else if (~topic.indexOf("MV")) {
        setMasterVolume(Number(message));
      } else if (~topic.indexOf("CVC")) {
        setCenterVolume(Number(message));
      } else if (~topic.indexOf("MS")) {
        setSurroundMode(message);
      }
    };

    MQTT.subscribe(`denon/${config.device}/status/SI`, handleMessage);
    MQTT.subscribe(`denon/${config.device}/status/PW`, handleMessage);
    MQTT.subscribe(`denon/${config.device}/status/MU`, handleMessage);
    MQTT.subscribe(`denon/${config.device}/status/MV`, handleMessage);
    MQTT.subscribe(`denon/${config.device}/status/MS`, handleMessage);
    MQTT.subscribe(`denon/${config.device}/status/CVC`, handleMessage);
    return () => {
      MQTT.unsubscribe(`denon/${config.device}/status/SI`, handleMessage);
      MQTT.unsubscribe(`denon/${config.device}/status/PW`, handleMessage);
      MQTT.unsubscribe(`denon/${config.device}/status/MU`, handleMessage);
      MQTT.unsubscribe(`denon/${config.device}/status/MV`, handleMessage);
      MQTT.unsubscribe(`denon/${config.device}/status/MS`, handleMessage);
      MQTT.unsubscribe(`denon/${config.device}/status/CVC`, handleMessage);
    };
  }, []);

  return {
    dispatch: d,
    power: power,
    input: input,
    mute: mute.current,
    masterVolume: masterVolume,
    centerVolume: centerVolume,
    surroundMode: surroundMode
  };
};

export default useDenon;
