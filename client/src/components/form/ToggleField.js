import React from "react";
import Toggle from "react-bootstrap-toggle";
import { FormGroup, ControlLabel, Col } from "react-bootstrap";

import Config from "../../../Config";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  return (
    <FormGroup style={{ marginBottom: 8 }}>
      <Col
        sm={Config.ui.labelCol}
        componentClass={ControlLabel}
        style={{ whiteSpace: "nowrap", float: "left" }}
      >
        {label}
      </Col>
      <Col
        sm={Config.ui.fieldCol}
        style={{ textAlign: "right", paddingRight: 50 }}
      >
        <Toggle
          active={toggled}
          onClick={() => {
            if (onToggle) {
              onToggle(name, toggled);
            }
          }}
        />
      </Col>
    </FormGroup>
  );
};
export default ToggleField;
