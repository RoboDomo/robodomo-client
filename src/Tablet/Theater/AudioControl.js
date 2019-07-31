import React, { useReducer } from "react";

import { IonIcon, IonList, IonListHeader, IonItem, IonLabel } from "@ionic/react";

import ActionButton from "@/common/ActionButton";

import denonReducer from "@/hooks/reducers/denonReducer";

const format = n => {
  if (n === null) {
    return 0;
  }
  if (typeof n === "number") {
    if (n > 99) {
      return n / 10;
    }
    return n;
  }
  if (n.length === 3) {
    return Number(n) / 10;
  }
  return Number(n);
};

const AudioControl = ({ avr }) => {
  const [, dispatch] = useReducer(denonReducer, { device: avr ? avr.device : null });
  if (!avr) {
    return null;
  }

  const button = (action, children, variant) => {
    if (action === "mute") {
      action = avr.mute ? "unmute" : "mute";
    }

    return (
      <IonItem>
        <ActionButton variant={variant} dispatch={dispatch} action={action}>
          {children}
        </ActionButton>
      </IonItem>
    );
  };

  return (
    <>
      <IonList>
        <IonListHeader>Master Volume</IonListHeader>
        {button("mute", <IonIcon name="volume-off" />, avr.mute ? "danger" : "primary")}
        {button("masterup", <IonIcon name="volume-high" />)}
        <IonLabel>{format(avr.masterVolume)}</IonLabel>
        {button("masterdown", <IonIcon name="volume-low" />)}
      </IonList>

      <IonList>
        <IonListHeader>Center Channel</IonListHeader>
        {button("centerup", <IonIcon name="volume-high" />)}
        <IonLabel>{format(avr.centerVolume)}</IonLabel>
        {button("centerdown", <IonIcon name="volume-low" />)}
      </IonList>

      <IonList>
        <IonListHeader>{avr.surroundMode}</IonListHeader>
        {button("auto", "Auto")}
        {button("movie", "Movie")}
        {button("music", "Music")}
      </IonList>
    </>
  );
};

//
export default AudioControl;
