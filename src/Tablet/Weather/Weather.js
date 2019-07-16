import React from "react";
import { Route, Redirect } from "react-router";
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from "@ionic/react";
import { IonContent } from "@ionic/react";
import useConfigGroup from "@/hooks/useConfigGroup";

import WeatherTab from "./WeatherTab";

const Weather = () => {
  const [locations, defaultLocation] = useConfigGroup("weather.locations");

  if (!locations) {
    return null;
  }

  return (
    <IonContent id="tab-weather">
      <IonTabs>
        <IonRouterOutlet>
          {locations.map(({ device: zip }) => (
            <Route
              path={`/weather/:tab(${zip})`}
              render={() => <WeatherTab zip={zip} />}
              key={zip}
            />
          ))}
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {locations.map(({ device: zip, name }) => (
            <IonTabButton tab={zip} href={`/weather/${zip}`} key={zip}>
              <IonLabel>{name}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
      <Route
        exact
        path="/weather"
        render={() => <Redirect to={`/weather/${defaultLocation.device}`} />}
      />
    </IonContent>
  );
};

//
export default Weather;
