import React, { useState, useRef } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
      <Form.Group as={Row} style={{ marginBottom: 8, marginTop: 0 }}>
        <Form.Label
          column
          sm={Config.ui.labelCol}
          style={{ whiteSpace: "nowrap", marginTop: 0 }}
        >
          {label}
        </Form.Label>
        <Col
          sm={Config.ui.fieldCol}
          style={{ textAlign: "right", whiteSpace: "nowrap" }}
        >
          <Button
            variant="primary"
            onClick={() => {
              change(val - step);
            }}
          >
            <FaChevronLeft />
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
            variant="primary"
            onClick={() => {
              change(val + step);
            }}
          >
            <FaChevronRight />
          </Button>
        </Col>
      </Form.Group>
    </Row>
  );
};
export default NumberField;
