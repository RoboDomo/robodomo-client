// FanField

import React from "react";

import { ButtonGroup, Button } from "react-bootstrap";

const FanField = ({ label, name, toggled, value, onChange }) => {
  if (!name) {
    throw new Error("FanField name prop required");
  }

  const styles = {};
  styles.on = toggled ? "primary" : "dark";
  styles.low = toggled && value <= 33 ? "dark" : "primary";
  styles.medium = toggled && value <= 66 && value > 33 ? "dark" : "primary";
  styles.high = toggled && value > 66 ? "dark" : "primary";

  return (
    <div style={{ display: "flex", marginTop: 10 }}>
      <div style={{ flex: 1, marginTop: 12 }}>{label}</div>
      <div style={{ textAlign: "right", marginRight: 25 }}>
        <ButtonGroup>
          <Button variant={styles.on} onClick={() => onChange(name, "off")}>
            Off
          </Button>
          <Button variant={styles.low} onClick={() => onChange(name, "low")}>
            Low
          </Button>
          <Button variant={styles.medium} onClick={() => onChange(name, "medium")}>
            Medium
          </Button>
          <Button variant={styles.high} onClick={() => onChange(name, "high")}>
            High
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

//
export default FanField;
