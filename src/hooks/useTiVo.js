import { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";
import useTVGuide from "@/hooks/useTVGuide";
import MQTT from "@/lib/MQTT";

const useTiVo = config => {
  const Config = useConfig();

  const [channel, setChannel] = useState(null);
  const [mode, setMode] = useState(null);
  const [reason, setReason] = useState(null);

  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (~topic.indexOf("channel")) {
        setChannel(message);
      } else if (~topic.indexOf("mode")) {
        setMode(message);
      } else if (~topic.indexOf("reason")) {
        setReason(message);
      } else {
        console.error("useTiVo: inalid topic", topic);
      }
    };

    const topic = `${Config.mqtt.tivo}/${config.device}/status/`;

    MQTT.subscribe(`${topic}channel`, handleMessage);
    MQTT.subscribe(`${topic}mode`, handleMessage);
    MQTT.subscribe(`${topic}reason`, handleMessage);
    return () => {
      MQTT.unsubscribe(`${topic}channel`, handleMessage);
      MQTT.unsubscribe(`${topic}mode`, handleMessage);
      MQTT.unsubscribe(`${topic}reason`, handleMessage);
    };
  }, [Config.mqtt.tivo, config.device]);

  const guide = useTVGuide(config.guide);
  return {
    device: config.device,
    guide: guide,
    channel: channel,
    mode: mode,
    reason: reason,
  };
};

//
export default useTiVo;
