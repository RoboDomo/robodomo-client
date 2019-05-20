import { useState, useEffect, useRef, useReducer } from "react";
import MQTT from "lib/MQTT";

import Config from "Config";

const useTiVo = config => {
  const topic = `${Config.mqtt.tivo}/${config.device}/status/`,
    set_topic = topic.replace("status", "set") + "command";

  const [channel, setChannel] = useState(null);
  const [mode, setMode] = useState(null);
  const [reason, setReason] = useState(null);

  const reducer = useRef((state, action) => {
    const actions = {
        clear: "CLEAR",
        livetv: "LIVETV",
        tivo: "TIVO",
        guide: "GUIDE",
        info: "INFO",

        thumbsup: "THUMBSUP",
        back: "BACK",
        thumbsdown: "THUMBSDOWN",

        up: "UP",
        channelup: "CHANNELUP",
        left: "LEFT",
        select: "SELECT",
        right: "RIGHT",
        down: "DOWN",
        channeldown: "CHANNLEDOWN",

        a: "a",
        b: "b",
        c: "c",
        d: "d",

        1: "NUM1",
        2: "NUM2",
        3: "NUM3",
        4: "NUM4",
        5: "NUM5",
        6: "NUM6",
        7: "NUM7",
        8: "NUM8",
        9: "NUM9",
        0: "NUM0",
        enter: "ENTER",

        replay: "REPLAY",
        reverse: "REVERSE",
        pause: "PAUSE",
        play: "PLAY",
        slow: "SLOW",
        forward: "FORWARD",
        advance: "ADVANCE",
        record: "RECORD"
      },
      act = action.type.toLowerCase(),
      message = actions[act];

    if (message) {
      MQTT.publish(set_topic, message);
    } else {
      console.error("invalid command", act);
    }
  });

  const handleMessage = (topic, message) => {
    console.log("handle", topic, message);
    if (~topic.indexOf("channel")) {
      setChannel(message);
    } else if (~topic.indexOf("mode")) {
      setMode(message);
    } else if (~topic.indexOf("reason")) {
      setReason(message);
    } else {
      console.error("inalid topic", topic);
    }
  };
  useEffect(() => {
    MQTT.subscribe(`${topic}channel`, handleMessage);
    MQTT.subscribe(`${topic}mode`, handleMessage);
    MQTT.subscribe(`${topic}reason`, handleMessage);
    return () => {
      MQTT.unsubscribe(`${topic}channel`, handleMessage);
      MQTT.unsubscribe(`${topic}mode`, handleMessage);
      MQTT.unsubscribe(`${topic}reason`, handleMessage);
    };
  }, []);

  const [, d] = useReducer(reducer.current);
  return {
    dispatch: d,
    channel: channel,
    mode: mode,
    reason: reason
  };
};

export default useTiVo;
