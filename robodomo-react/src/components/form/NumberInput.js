import React, { useState, useRef } from "react";

import { Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
        variant="primary"
        onClick={e => {
          e.stopPropagation();
          change(val - step);
        }}
      >
        <FaChevronLeft />
      </Button>
      <input
        type="text"
        style={{ width: 40, textAlign: "center", marginTop: 16, height: 34 }}
        value={val}
        readOnly
      />
      <Button
        variant="primary"
        onClick={e => {
          e.stopPropagation();
          change(val + step);
        }}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};
export default NumberInput;
