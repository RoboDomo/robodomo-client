import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  return (
    <>
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
    </>
  );
};

//
export default ToggleField;
