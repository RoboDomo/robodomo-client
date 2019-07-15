import React /*, { useState, useEffect, useRef }*/ from "react";

import s from "./DimmerField.module.css";
import { IonRange, IonIcon, IonToggle } from '@ionic/react';

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
    <div style={{ display: "flex", marginTop: 10 }}>
      <div style={{ marginTop: 10, flex: 1 }}>{label}</div>
      <div style={{ whiteSpace: "nowrap", display: "flex" }}>
        <IonToggle checked={toggled} onClick={handleToggle} className={s.toggle}/>
        <div style={{ flex: 1, marginTop: 0 }}>
          <IonRange
            className = {s.range}
            value={value || 0}
            step={1}
            onIonChange={handleSliderChange}
            debounce={100}
            min={1}
            max={100}
          >
            <IonIcon slot="start" size="small" name="sunny"></IonIcon>
            <IonIcon slot="end" name="sunny"></IonIcon>
          </IonRange>
        </div>
      </div>
    </div>
  );
};

//
export default DimmerField;
