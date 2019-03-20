import React, { useState, useRef } from "react";

import {
  FormGroup,
  ControlLabel,
  Row,
  Col,
  Button,
  Glyphicon
} from "react-bootstrap";

//import DelayedTask from "lib/DelayedTask";

import Config from "Config";

const NumberField = ({ label, value, step = 1, min, max, onValueChange }) => {
  const [val, setVal] = useState(Number(value));
  const changed = useRef(false);
  const timer = useRef(null);

  if (!changed.current && val !== value) {
    setVal(value);
  }

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
    changed.current = true;
    timer.current = setTimeout(() => {
      timer.current = null;
      changed.current = false;
      if (onValueChange) {
        onValueChange(value);
      }
    }, 500);
  };

  return (
    <Row style={{ padding: 0, margin: 0 }}>
      <FormGroup style={{ marginBottom: 8, marginTop: 0 }}>
        <Col
          sm={Config.ui.labelCol}
          componentClass={ControlLabel}
          style={{ whiteSpace: "nowrap", marginTop: 0 }}
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
            style={{
              width: 40,
              textAlign: "center",
              height: 38
            }}
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
    </Row>
  );
};
export default NumberField;
