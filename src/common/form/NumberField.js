import React, { useState, useRef } from "react";

import { IonInput, IonButton, IonIcon } from "@ionic/react";

//import DelayedTask from "@/lib/DelayedTask";

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
      <div style={{ marginTop: 8 }}>{label}</div>
      <IonButton
        onClick={() => {
          change(val - step);
        }}
      >
        <IonIcon name="arrow-dropleft" />
      </IonButton>
      <IonInput
        type="text"
        style={{
          width: 32,
          height: 42,
        }}
        value={val}
        readOnly
      />
      <IonButton
        onClick={() => {
          change(val + step);
        }}
      >
        <IonIcon name="arrow-dropright" />
      </IonButton>
    </div>
  );
};

//
export default NumberField;
