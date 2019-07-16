import React from "react";
import { Route, Redirect } from "react-router";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonContent,
} from "@ionic/react";
import useConfigGroup from "@/hooks/useConfigGroup";

import TheaterTab from "./TheaterTab";

const Theater = () => {
  const [theaters, defaultTheater] = useConfigGroup("theaters");

  if (!theaters) {
    return null;
  }

  return (
    <IonContent id="tab-dashboard">
      <IonTabs>
        <IonRouterOutlet>
          {theaters.map(theater => (
            <Route
              path={`/theater/:tab(${theater.key})`}
              render={() => <TheaterTab theater={theater} />}
              key={theater.key}
            />
          ))}
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {theaters.map(theater => (
            <IonTabButton tab={theater.key} href={`/theater/${theater.key}`} key={theater.key}>
              <IonLabel>{theater.title}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
      <Route
        exact
        path="/theater"
        render={() => <Redirect to={`/theater/${defaultTheater.key}`} />}
      />
    </IonContent>
  );
};
export default Theater;
