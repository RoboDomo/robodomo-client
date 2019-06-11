import React, { useState, useEffect } from "react";
import useConfig from "@/common/hooks/useConfig";

import { Image } from "react-bootstrap";

import MQTT from "lib/MQTT";

const TiVo = ({ device }) => {
  const Config = useConfig();
  const [channel, setChannel] = useState(0);
  const [channels, setChannels] = useState({});

  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (~topic.indexOf("channels")) {
        try {
          setChannels(JSON.parse(message));
        } catch (e) {
          setChannels(message);
        }
      } else if (~topic.indexOf("channel")) {
        setChannel(message);
      }
    };

    MQTT.subscribe(`${Config.mqtt.tivo}/${device.device}/status/channel`, handleMessage);
    MQTT.subscribe(`${Config.mqtt.tvguide}/${device.guide}/status/channels`, handleMessage);
    return () => {
      MQTT.unsubscribe(`${Config.mqtt.tivo}/${device.device}/status/channel`, handleMessage);
      MQTT.unsubscribe(`${Config.mqtt.tvguide}/${device.guide}/status/channels`, handleMessage);
    };
  }, [Config.mqtt.tivo, Config.mqtt.tvguide, device.device, device.guide]);

  const info = channels[channel];
  if (!info) {
    return null;
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Image style={{ width: 32, height: "auto" }} src={info.logo.URL} />{" "}
        <div style={{ marginBottom: 4 }}>
          {channel} {info.name}
        </div>
      </div>
    </>
  );
};

export default TiVo;
