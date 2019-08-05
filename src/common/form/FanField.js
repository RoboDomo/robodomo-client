// FanField

import React from "react";

import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const FanField = ({ label, name, toggled, value, onChange }) => {
  if (!name) {
    throw new Error("FanField name prop required");
  }

  const checked = {};
  checked.off = !toggled;
  checked.low = toggled && value <= 33;
  checked.medium = toggled && value <= 66 && value > 33;
  checked.high = toggled && value > 66;

  return (
    <>
      <IonSegment>
        <IonSegmentButton checked={checked.off} onClick={() => onChange(name, "off")}>
          <IonLabel>Off</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton checked={checked.low} onClick={() => onChange(name, "low")}>
          <IonLabel>Low</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton checked={checked.medium} onClick={() => onChange(name, "medium")}>
          <IonLabel>Medium</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton checked={checked.high} onClick={() => onChange(name, "high")}>
          <IonLabel>High</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </>
  );
};

//
export default FanField;
