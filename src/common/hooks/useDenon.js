import { useState, useEffect, useRef, useReducer } from "react";
import MQTT from "lib/MQTT";
import Config from "Config";

const useDenon = config => {
  const [power, setPower] = useState(null);
  const [input, setInput] = useState(null);
  const [masterVolume, setMasterVolume] = useState(null);
  const [centerVolume, setCenterVolume] = useState(null);
  const [surroundMode, setSurroundMode] = useState(null);
  const [digitalInputMode, setDigitalInputMode] = useState(null);

  const topic = `${Config.mqtt.denon}/${config.device}/status/`,
    set_topic = topic.replace("status", "set") + "command";

  const mute = useRef(null);
  const reducer = useRef((state, action) => {
    const actions = {
        masterup: "MVUP",
        masterdown: "MVDOWN",
        centerup: "CVC UP",
        centerdown: "CVC DOWN",
        auto: "MSAUTO",
        movie: "MSMOVIE",
        music: "MSMUSIC",
        poweron: "PWON",
        poweroff: "PWSTANDBY",
        standby: "PWSTANDBY",
        menuon: "MNMEN ON",
        menuoff: "MNMEN OFF",
        up: "MNCUP",
        down: "MNCDN",
        left: "MNCLT",
        right: "MNCRT",
        enter: "MNENT",
        return: "MNRTN",
        tv: "SITV",
        dvd: "SIDVD",
        blueray: "SIBD",
        satcbl: "SISAT/CBL",
        mplayer: "SIMPLAY",
      },
      act = action.type.toLowerCase();

    if (act === "mute") {
      const mu = mute.current ? "MUOFF" : "MUON";
      MQTT.publish(set_topic, mu);
      mute.current = !mute;
    } else {
      const message = actions[act];
      if (message) {
        MQTT.publish(set_topic, message);
      } else {
        console.error("invalid command", act);
      }
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
      } else if (~topic.indexOf("DC")) {
        setDigitalInputMode(message);
      }
    };

    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/SI`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/PW`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/MU`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/MV`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/MS`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/CVC`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.denon}/${config.device}/status/DC`, handleMessage);
    return () => {
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/SI`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/PW`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/MU`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/MV`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/MS`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/CVC`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.denon}/${config.device}/status/DC`, handleMessage);
    };
  }, [config.device]);

  return {
    dispatch: d,
    power: power,
    input: input,
    mute: mute.current,
    masterVolume: masterVolume,
    centerVolume: centerVolume,
    surroundMode: surroundMode,
    digitalInputMode: digitalInputMode,
  };
};

export default useDenon;
