import { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const useDenon = device => {
  const Config = useConfig();

  const [$power, setPower] = useState(null);
  const [$input, setInput] = useState(null);
  const [$mute, setMute] = useState(null);
  const [$masterVolume, setMasterVolume] = useState(null);
  const [$centerVolume, setCenterVolume] = useState(null);
  const [$surroundMode, setSurroundMode] = useState(null);
  const [$digitalInputMode, setDigitalInputMode] = useState(null);

  const deviceName = device.device,
    topic = `${Config.mqtt.denon}/${deviceName}/status`,
    set_topic = topic.replace("status", "set") + "command";

  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (~topic.indexOf("SI")) {
        setInput(message);
      } else if (~topic.indexOf("PW")) {
        setPower(message.toUpperCase() === "ON");
      } else if (~topic.indexOf("MU")) {
        const st = message.toUpperCase() === "ON";
        setMute(st);
      } else if (~topic.indexOf("MV")) {
        setMasterVolume(Number(message));
      } else if (~topic.indexOf("CVC")) {
        setCenterVolume(Number(message));
      } else if (~topic.indexOf("MS")) {
        setSurroundMode(message);
      } else if (~topic.indexOf("DC")) {
        setDigitalInputMode(message);
      }
    };

    MQTT.subscribe(`${topic}/SI`, handleMessage);
    MQTT.subscribe(`${topic}/PW`, handleMessage);
    MQTT.subscribe(`${topic}/MU`, handleMessage);
    MQTT.subscribe(`${topic}/MV`, handleMessage);
    MQTT.subscribe(`${topic}/MS`, handleMessage);
    MQTT.subscribe(`${topic}/CVC`, handleMessage);
    MQTT.subscribe(`${topic}/DC`, handleMessage);

    return () => {
      MQTT.unsubscribe(`${topic}/SI`, handleMessage);
      MQTT.unsubscribe(`${topic}/PW`, handleMessage);
      MQTT.unsubscribe(`${topic}/MU`, handleMessage);
      MQTT.unsubscribe(`${topic}/MV`, handleMessage);
      MQTT.unsubscribe(`${topic}/MS`, handleMessage);
      MQTT.unsubscribe(`${topic}/CVC`, handleMessage);
      MQTT.unsubscribe(`${topic}/DC`, handleMessage);
    };
  }, [Config.mqtt.denon, setMute, topic]);

  return {
    device: device.device,
    get power() {
      return $power;
    },
    set power(v) {
      MQTT.publish(set_topic, "PW", v === true || v === "on" ? "ON" : "STANDBY");
    },
    get input() {
      return $power ? $input : "OFF";
    },
    set input(v) {
      MQTT.publish(set_topic, "SI" + v);
    },
    get mute() {
      return $mute;
    },
    set mute(v) {
      MQTT.publish(set_topic, "MU", v === true || v === "on" ? "ON" : "OFF");
    },
    get masterVolume() {
      return $masterVolume;
    },
    set masterVolume(v) {
      MQTT.publish(set_topic, "MV" + v);
    },
    get centerVolume() {
      return $centerVolume;
    },
    set centerVolume(v) {
      MQTT.publish(set_topic, "CVC" + v);
    },
    get surroundMode() {
      return $surroundMode;
    },
    set surroundMode(v) {
      MQTT.publish(set_topic, "MS" + v);
    },
    get digitalInputMode() {
      return $digitalInputMode;
    },
    set digitalInputMode(v) {
      MQTT.publish(set_topic, "DC" + v);
    },
  };
};

//
export default useDenon;
