import React, { useState, useEffect } from "react";
import useConfig from "@/common/hooks/useConfig";

import MQTT from "lib/MQTT";

import ToggleField from "common/form/ToggleField";
import DimmerField from "common/form/DimmerField";
import FanField from "common/form/FanField";
import DisplayField from "common/form/DisplayField";

const SmartThingsTab = ({ room }) => {
  const Config = useConfig();
  const [state, setState] = useState({});
  const status_topic = `${Config.mqtt.smartthings}/`,
    set_topic = status_topic;

  const valueChange = (name, value) => {
    const newValue = {};
    newValue[name] = value;
    setState(prev => ({ ...prev, ...newValue }));
  };

  const control = (name, state) => {
    //
    const newValue = {};
    newValue[name] = state;
    setState(prev => ({ ...prev, ...newValue }));
    MQTT.publish(`${set_topic}${name}/set`, state);
  };

  const toggleSwitch = (name, state) => {
    control(`${name}/switch`, state ? "on" : "off");
  };

  const handleFanChange = (name, state) => {
    const levels = {
      low: 25,
      medium: 50,
      high: 75,
    };

    if (state === "off") {
      control(`${name}/switch`, "off");
    } else {
      if (levels[state]) {
        control(`${name}/switch`, "on");
        control(`${name}/level`, levels[state]);
      }
    }
  };

  useEffect(() => {
    const handleStateChange = (topic, newState) => {
      valueChange(topic.substr(status_topic.length), newState);
    };

    for (const thing of room.things) {
      switch (thing.type) {
        case "dimmer":
        case "fan":
          MQTT.subscribe(`${status_topic}${thing.name}/switch`, handleStateChange);
          MQTT.subscribe(`${status_topic}${thing.name}/level`, handleStateChange);
          break;
        case "switch":
          MQTT.subscribe(`${status_topic}${thing.name}/switch`, handleStateChange);
          break;
        case "motion":
          MQTT.subscribe(`${status_topic}${thing.name}/motion`, handleStateChange);
          break;
        case "presence":
          MQTT.subscribe(`${status_topic}${thing.name}/presence`, handleStateChange);
          break;
        case "button":
          MQTT.subscribe(`${status_topic}${thing.name}/pressed`, handleStateChange);
          break;
        case "contact":
          MQTT.subscribe(`${status_topic}${thing.name}/contact`, handleStateChange);
          break;
        case "temperature":
          MQTT.subscribe(`${status_topic}${thing.name}/temperature`, handleStateChange);
          break;
        case "acceleration":
          break;
        case "threeAxis":
          break;
        default:
          console.warn("SmartThingsTab invalid thing: ", thing);
          break;
      }
    }

    return () => {
      for (const thing of room.things) {
        switch (thing.type) {
          case "dimmer":
          case "fan":
            MQTT.unsubscribe(`${status_topic}${thing.name}/switch`, handleStateChange);
            MQTT.unsubscribe(`${status_topic}${thing.name}/level`, handleStateChange);
            break;
          case "switch":
            MQTT.unsubscribe(`${status_topic}${thing.name}/switch`, handleStateChange);
            break;
          case "motion":
            MQTT.unsubscribe(`${status_topic}${thing.name}/motion`, handleStateChange);
            break;
          case "presence":
            MQTT.unsubscribe(`${status_topic}${thing.name}/presence`, handleStateChange);
            break;
          case "button":
            MQTT.unsubscribe(`${status_topic}${thing.name}/pressed`, handleStateChange);
            break;
          case "contact":
            MQTT.unsubscribe(`${status_topic}${thing.name}/contact`, handleStateChange);
            break;
          case "temperature":
            MQTT.unsubscribe(`${status_topic}${thing.name}/temperature`, handleStateChange);
            break;
          case "acceleration":
            break;
          case "threeAxis":
            break;
          default:
            console.warn("SmartThingsTab invalid thing: ", thing);
            break;
        }
      }
    };
  }, [room.things, status_topic]);

  return (
    <div style={{ overflow: "scroll", height: "100vh", paddingBottom: 300 }}>
      <div
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        {room.things.map((thing, ndx) => {
          const key = `${room.name}-${thing.name}-${ndx}`;
          const toggled = state[`${thing.name}/switch`] === "on";
          switch (thing.type) {
            case "switch":
              return (
                <ToggleField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  toggled={toggled}
                  onToggle={toggleSwitch}
                />
              );
            case "dimmer":
              return (
                <DimmerField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  value={state[`${thing.name}/level`]}
                  toggled={state[`${thing.name}/switch`] === "on"}
                  onToggle={toggleSwitch}
                  onValueChange={control}
                />
              );
            case "fan":
              return (
                <FanField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  toggled={state[`${thing.name}/switch`] === "on"}
                  value={state[`${thing.name}/level`]}
                  onChange={handleFanChange}
                />
              );
            case "motion":
              return (
                <DisplayField
                  key={key}
                  label={thing.name}
                  value={"motion " + state[`${thing.name}/motion`]}
                />
              );
            case "presence":
              return (
                <DisplayField
                  key={key}
                  label={thing.name}
                  value={state[`${thing.name}/presence`]}
                />
              );
            case "contact":
              return (
                <DisplayField
                  key={key}
                  label={thing.name}
                  value={"contact " + state[`${thing.name}/contact`]}
                />
              );
            case "temperature":
              return (
                <DisplayField
                  key={key}
                  label={thing.name}
                  value={state[`${thing.name}/temperature`]}
                />
              );
            case "acceleration":
            case "threeAxis":
              return null;
            default:
              return (
                <div key={key}>
                  {thing.name} {thing.type}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

//
export default SmartThingsTab;
