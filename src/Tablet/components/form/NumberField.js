import React, { useState, useRef } from "react";

import { Button } from "react-bootstrap";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//import DelayedTask from "lib/DelayedTask";

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
    <div style={{ display: "flex" }}>
      <div style={{ marginTop: 8, flex: 1 }}>{label}</div>
      <div className="float-right" style={{ whiteSpace: "nowrap" }}>
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
      </div>
    </div>
  );
};

//
export default NumberField;
