import React, { useState, useRef } from "react";

import {
  FormGroup,
  ControlLabel,
  Col,
  Button,
  Glyphicon
} from "react-bootstrap";

import Config from "Config";

const NumberField = ({ label, value, step = 1, min, max, onValueChange }) => {
  const [val, setVal] = useState(Number(value));
  const timer = useRef(null);

  const change = value => {
    if (value <= min) {
      value = min;
    } else if (value >= max) {
      value = max;
    }
    if (value !== val) {
      setVal(value);
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      timer.current = null;
      if (onValueChange) {
        onValueChange(value);
      }
    }, 500);
  };

  return (
    <FormGroup style={{ marginBottom: 8 }}>
      <Col
        sm={Config.ui.labelCol}
        componentClass={ControlLabel}
        style={{ whiteSpace: "nowrap", float: "left" }}
      >
        {label}
      </Col>
      <Col sm={Config.ui.fieldCol} style={{ textAlign: "right" }}>
        <Button
          bsStyle="primary"
          onClick={() => {
            change(val - step);
          }}
        >
          <Glyphicon glyph="chevron-left" />
        </Button>
        <input
          type="text"
          style={{ width: 40, textAlign: "center" }}
          value={val}
          readOnly
        />
        <Button
          bsStyle="primary"
          onClick={() => {
            change(val + step);
          }}
        >
          <Glyphicon glyph="chevron-right" />
        </Button>
      </Col>
    </FormGroup>
  );
};
export default NumberField;
