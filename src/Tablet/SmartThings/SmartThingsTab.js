import React, { useRef, useEffect } from "react";
import useConfig from "@/hooks/useConfig";
import {
  useSwitch,
  useDimmer,
  useFan,
  useMotion,
  usePresence,
  useTemperature,
  useButton,
  useContact,
} from "@/hooks/useSmartThings";

import ToggleField from "@/common/form/ToggleField";
import DimmerField from "@/common/form/DimmerField";
import FanField from "@/common/form/FanField";
import DisplayField from "@/common/form/DisplayField";

const SmartThingsTab = ({ room }) => {
  const Config = useConfig();
  const things = useRef({
    dimmer: {},
    fan: {},
    switch: {},
    motion: {},
    presence: {},
    button: {},
    contact: {},
    temperature: {},
  });

  const toggleSwitch = (name, state) => {
    const thing = things.current.switch[name];
    thing.switch = thing.switch === "on" ? "off" : "on";
  };

  useEffect(() => {
    return () => {
      for (const thing of room.things) {
        delete things[thing.name];
      }
    };
  }, [room.things, things]);

  for (const thing of room.things) {
    switch (thing.type) {
      case "dimmer":
        things.current.dimmer[thing.name] = useDimmer(thing.name);
        break;
      case "fan":
        things.current.fan[thing.name] = useFan(thing.name);
        break;
      case "switch":
        things.current.switch[thing.name] = useSwitch(thing.name);
        break;
      case "motion":
        things.current.motion[thing.name] = useMotion(thing.name);
        break;
      case "presence":
        things.current.presence[thing.name] = usePresence(thing.name);
        break;
      case "button":
        things.current.button[thing.name] = useButton(thing.name);
        break;
      case "contact":
        things.current.contact[thing.name] = useContact(thing.name);
        break;
      case "temperature":
        things.current.temperature[thing.name] = useTemperature(thing.name);
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

  const handleFanChange = (name, state) => {
    const levels = {
      low: 25,
      medium: 50,
      high: 75,
    };

    const thing = things.current.fan[name];
    if (state === "off") {
      thing.switch = "off";
    } else {
      if (levels[state]) {
        if (thing.switch !== "on") {
          thing.switch = "on";
        }
        thing.level = levels[state];
      }
    }
  };

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
          let t;
          switch (thing.type) {
            case "switch":
              t = things.current.switch[thing.name];
              if (!t) {
                return null;
              }
              const toggled = t.switch === "on";
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
              t = things.current.dimmer[thing.name];
              if (!t) {
                return null;
              }
              return (
                <DimmerField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  value={t.level}
                  toggled={t.switch === "on"}
                  onToggle={toggleSwitch}
                  onValueChange={(name, level) => {
                    t.level = level;
                  }}
                />
              );
            case "fan":
              t = things.current.fan[thing.name];
              if (!t) {
                return null;
              }
              return (
                <FanField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  toggled={t.switch === "on"}
                  value={t.level}
                  onChange={handleFanChange}
                />
              );
            case "motion":
              t = things.current.motion[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={"motion " + t.motion} />;
            case "presence":
              t = things.current.presence[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={t.presence} />;
            case "contact":
              t = things.current.contact[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={"contact " + t.contact} />;
            case "temperature":
              t = things.current.temperature[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={t.temperature} />;
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
