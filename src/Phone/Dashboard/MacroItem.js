/**
 * MacroItem
 *
 * A dashboard item that runs a macro when pressed.
 */
import React from "react";
import useConfig from "@/hooks/useConfig";

import { ListGroup } from "react-bootstrap";

import MQTT from "@/lib/MQTT";
import { FaRunning } from "react-icons/fa";

const MacroItem = ({ label, name }) => {
  const Config = useConfig();
  const topic = `${Config.mqtt.macros}/run`;

  const onClick = () => {
    if (!name) {
      console.warn("MacroItem needs name prop");
    } else {
      MQTT.publish(topic, name);
    }
  };

  return (
    <ListGroup.Item style={{ flexDirection: "column" }} onClick={onClick}>
      <span style={{ fontSize: 24, textAlign: "center", marginBottom: 10 }}>
        <FaRunning size={24} />
      </span>
      <span style={{ marginLeft: 10, fontSize: 20 }}>{label}</span>
      <span className="float-right" style={{ fontSize: 20 }}>
        {"Macro"}
      </span>
    </ListGroup.Item>
  );
};

export default MacroItem;
