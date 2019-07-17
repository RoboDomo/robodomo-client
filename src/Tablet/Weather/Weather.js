import React from "react";
import { Route, Redirect } from "react-router";
import { get } from "lodash-es";
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from "@ionic/react";
import { IonContent } from "@ionic/react";
import useConfig from "@/hooks/useConfig";

import WeatherTab from "./WeatherTab";

const Weather = () => {
  const Config = useConfig();
  const locations = get(Config, "weather.locations", null);

  if (!locations || !Array.isArray(locations)) {
    return null;
  }

  const defaultLocation = locations.find(loc => loc.default === true) || locations[0];

  return (
    <IonContent id="tab-weather">
      <IonTabs>
        <IonRouterOutlet>
          {locations.map(({ device: zip }) => (
            <Route path={`/weather/:tab(${zip})`} component={WeatherTab} key={zip} />
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
