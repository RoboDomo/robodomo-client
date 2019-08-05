import React from "react";
import { IonSegment, IonSegmentButton, IonLabel, IonItem } from "@ionic/react";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  return (
    <IonItem style={{ display: "flex", marginTop: 10 }}>
      <IonLabel style={{ marginTop: 12, flex: 1 }}>{label}</IonLabel>
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
    </IonItem>
  );
};

//
export default ToggleField;
