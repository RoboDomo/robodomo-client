import React /*, { useState, useEffect, useRef }*/ from "react";

import s from "./DimmerField.module.css";
import { IonRange, IonIcon, IonToggle, IonItem, IonLabel } from "@ionic/react";

const DimmerField = ({ label, name, value, toggled, onToggle, onValueChange }) => {
  const applyValueChange = val => {
    value = val;
    if (onValueChange) {
      onValueChange(`${name}/level`, value);
    }
  };

  const handleSliderChange = e => {
    const val = e.target.value;
    applyValueChange(val);
  };

  const handleToggle = state => {
    if (onToggle) {
      onToggle(name, state);
    }
  };

  return (
    <IonItem style={{ display: "flex", marginTop: 10 }}>
      <IonLabel style={{ marginTop: 10, flex: 1 }}>{label}</IonLabel>
      <div style={{ whiteSpace: "nowrap", display: "flex" }}>
        <IonToggle checked={toggled} onClick={handleToggle} className={s.toggle} />
        <div style={{ flex: 1, marginTop: 0 }}>
          <IonRange
            className={s.range}
            value={value || 0}
            step={1}
            onIonChange={handleSliderChange}
            debounce={100}
            min={1}
            max={100}
          >
            <IonIcon slot="start" size="small" name="sunny" />
            <IonIcon slot="end" name="sunny" />
          </IonRange>
        </div>
      </div>
    </IonItem>
  );
};

//
export default DimmerField;
