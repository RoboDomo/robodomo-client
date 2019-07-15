import React, { useState, useRef } from "react";

import { IonInput, IonButton, IonIcon, IonItem } from "@ionic/react"

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
      <div style={{ marginTop: 8, flex: 1 }}>{label}</div>
      <IonItem className="float-right">
        <IonButton 
          onClick={() => {
            change(val - step);
          }}
        >
          <IonIcon name="arrow-dropleft"></IonIcon>
        </IonButton>
        <IonInput
          type="text"
          style={{
            width: 40,
            textAlign: "center",
            height: 38,
          }}
          value={val}
          readOnly
        />
        <IonButton
          onClick={() => {
            change(val + step);
          }}
        >
          <IonIcon name="arrow-dropright"></IonIcon>
        </IonButton>
      </IonItem>
    </div>
  );
};

//
export default NumberField;
