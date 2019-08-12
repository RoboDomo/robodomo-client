import React from "react";
import {
  IonList,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonListHeader,
  IonLabel,
  IonBadge,
} from "@ionic/react";
import s from "./DevicesListGroup.module.css";

const DevicesListGroup = ({ devices, currentDevice, tvInput, avrInput, onClick }) => {
  tvInput = tvInput || "off";
  if (!devices.length || !tvInput) {
    return null;
  }

  //<ListGroup.Item variant="dark">Devices</ListGroup.Item>
  return (
    <IonList>
      <IonRadioGroup>
        <IonListHeader class={s.header}>Devices</IonListHeader>
        {devices.map(device => {
          const deviceType = device.type;
          let deviceName = device.name;

          if (deviceType === "bravia" || deviceType === "lgtv") {
            if (true || ~tvInput.indexOf("hdmi")) {
              deviceName = (
                <>
                  <IonLabel>{device.name}</IonLabel>
                  <IonBadge color="secondary" slot="end">
                    {tvInput.toUpperCase()}
                  </IonBadge>
                </>
              );
            } else {
              deviceName = (
                <>
                  <IonLabel>{device.name}</IonLabel>
                  <br />
                  {tvInput.toUpperCase()}
                </>
              );
            }
          } else if (deviceType === "denon" && avrInput) {
            deviceName = (
              <>
                <IonLabel>{device.name}</IonLabel>
                <IonBadge color="secondary" slot="end">
                  {avrInput.toUpperCase()}
                </IonBadge>
              </>
            );
          }

          return (
            <IonItem
              lines="none"
              color={currentDevice === device.name ? "dark" : undefined}
              onClick={() => {
                onClick(device);
              }}
              button={true}
            >
              {deviceName}
              <IonRadio slot="start" value={device.name} checked={currentDevice === device.name} />
            </IonItem>
          );
        })}
      </IonRadioGroup>
    </IonList>
  );
};

export default DevicesListGroup;
