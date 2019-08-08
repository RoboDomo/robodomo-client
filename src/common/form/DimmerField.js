import React /*, { useState, useEffect, useRef }*/ from "react";

import s from "./DimmerField.module.css";
import { IonRange, IonIcon, IonToggle } from "@ionic/react";

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
    <div className={s.container}>
      <IonToggle checked={toggled} onClick={handleToggle} className={s.toggle} mode="md" />
      <IonRange
        mode="md"
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
  );
};

//
export default DimmerField;
