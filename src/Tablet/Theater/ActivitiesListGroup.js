import React from "react";
import { IonList, IonRadioGroup, IonRadio, IonItem, IonListHeader, IonLabel } from "@ionic/react";
import s from "./ActivitiesListGroup.module.css";

const ActivitiesListGroup = ({ activities, currentActivity, onClick }) => {
  if (!activities.length) {
    return null;
  }
  // <ListGroup.Item variant="dark">Activities</ListGroup.Item>
  return (
    <IonList>
      <IonRadioGroup>
        <IonListHeader class={s.header}>Activities</IonListHeader>
        {activities.map(activity => {
          return (
            <IonItem
              color={currentActivity === activity.name ? "success" : undefined}
              onClick={() => {
                onClick(activity);
              }}
              button={true}
            >
              <IonLabel class={s.label}>{activity.name}</IonLabel>
              <IonRadio
                slot="start"
                value={activity.name}
                checked={currentActivity === activity.name}
              />
            </IonItem>
          );
        })}
      </IonRadioGroup>
    </IonList>
  );
};
export default ActivitiesListGroup;
