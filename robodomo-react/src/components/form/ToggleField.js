import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  ControlLabel,
  Row,
  Col
} from "react-bootstrap";

import Config from "Config";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  const defaultValue = toggled ? 1 : 2;
  return (
    <Row>
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
      </FormGroup>
    </Row>
  );
};
export default ToggleField;
