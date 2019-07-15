import React from "react";
import { Route } from "react-router";
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from "@ionic/react";
import { IonContent } from "@ionic/react";
import useConfig from "@/hooks/useConfig";

import WeatherTab from "./WeatherTab";

const Weather = () => {
  const Config = useConfig();
  if (!Config) {
    return null;
  }
  return (
    <IonContent id="tab-weather">
      <IonTabs>
        <IonRouterOutlet>
          {Config.weather.locations.map(({ device: zip }) => (
            <Route path={`/weather/:tab(${zip})`} component={WeatherTab} key={zip} />
          ))}
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {Config.weather.locations.map(({ device: zip, name }) => (
            <IonTabButton tab={zip} href={`/weather/${zip}`} key={zip}>
              <IonLabel>{name}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};

//
export default Weather;
