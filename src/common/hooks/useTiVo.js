import { useState, useEffect, useRef, useReducer } from "react";
import useConfig from "@/common/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const useTiVo = config => {
  const Config = useConfig();
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
        channeldown: "CHANNELDOWN",

        a: "a",
        b: "b",
        c: "c",
        d: "d",

        num1: "NUM1",
        num2: "NUM2",
        num3: "NUM3",
        num4: "NUM4",
        num5: "NUM5",
        num6: "NUM6",
        num7: "NUM7",
        num8: "NUM8",
        num9: "NUM9",
        num0: "NUM0",
        enter: "ENTER",

        replay: "REPLAY",
        reverse: "REVERSE",
        pause: "PAUSE",
        play: "PLAY",
        slow: "SLOW",
        forward: "FORWARD",
        advance: "ADVANCE",
        record: "RECORD",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [, d] = useReducer(reducer.current);
  return {
    dispatch: d,
    channel: channel,
    mode: mode,
    reason: reason,
  };
};

export default useTiVo;
