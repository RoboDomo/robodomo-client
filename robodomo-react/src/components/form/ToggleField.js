import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Form,
  Row,
  Col
} from "react-bootstrap";

import Config from "Config";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  const defaultValue = toggled ? 1 : 2;
  return (
    <Form.Group as={Row} style={{ marginBottom: 8 }}>
      <Form.Label column sm={Config.ui.labelCol}>
        <span style={{ whiteSpace: "nowrap" }}>{label}</span>
      </Form.Label>
      <Col
        sm={Config.ui.fieldCol}
        style={{ textAlign: "right", paddingRight: 30 }}
      >
        <ToggleButtonGroup
          onChange={() => {
            if (onToggle) {
              onToggle(!toggled);
            }
          }}
          type="radio"
          name={name}
          value={defaultValue}
        >
          <ToggleButton value={1}>On</ToggleButton>
          <ToggleButton value={2}>Off</ToggleButton>
        </ToggleButtonGroup>
      </Col>
    </Form.Group>
  );
};
export default ToggleField;
