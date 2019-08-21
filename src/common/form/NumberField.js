import React, { useState, useRef } from "react";

import { IonLabel, IonButton, IonIcon } from "@ionic/react";

//import DelayedTask from "@/lib/DelayedTask";

const NumberField = ({ value, step = 1, min, max, onValueChange }) => {
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
    <div style={{ display: "inline", textAlign: "center" }}>
      <IonButton
        onClick={e => {
          e.stopPropagation();
          change(val - step);
        }}
      >
        <IonIcon name="arrow-dropleft" />
      </IonButton>
      <IonLabel style={{ margin: 10 }}>{val}</IonLabel>
      <IonButton
        onClick={e => {
          e.stopPropagation();
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
