import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  return (
    <div style={{ display: "flex", marginTop: 10 }}>
      <div style={{ marginTop: 12, flex: 1 }}>{label}</div>
      <div className="float-right" style={{ whiteSpace: "nowrap" }}>
        <IonSegment>
          <IonSegmentButton
            checked={toggled ? true : undefined}
            onClick={() => {
              if (onToggle && !toggled) {
                onToggle(name, true);
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={toggled ? undefined : true}
            onClick={() => {
              if (onToggle && toggled) {
                onToggle(name, false);
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
    </div>
  );
};

//
export default ToggleField;
