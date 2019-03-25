import React, { useState, useRef } from "react";

import { Button, Glyphicon } from "react-bootstrap";

const NumberInput = ({ value, step = 1, min, max, onValueChange }) => {
  const timer = useRef(null);
  const [val, setVal] = useState(Number(value));
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
    <div>
      <Button
        bsStyle="primary"
        onClick={e => {
          e.stopPropagation();
          change(val - step);
        }}
      >
        <Glyphicon glyph="chevron-left" />
      </Button>
      <input
        type="text"
        style={{ width: 40, textAlign: "center", marginTop: 16, height: 34 }}
        value={val}
        readOnly
      />
      <Button
        bsStyle="primary"
        onClick={e => {
          e.stopPropagation();
          change(val + step);
        }}
      >
        <Glyphicon glyph="chevron-right" />
      </Button>
    </div>
  );
};
export default NumberInput;
