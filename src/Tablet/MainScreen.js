/**
 * Tablet MainScreen component
 *
 * Implements the top bar as tabs and renders app content below
 */

import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router";

import { IonApp, IonPage, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";

const Dashboard = lazy(() =>
  import(
    "Tablet/Dashboard/Dashboard" /* webpackChunkName: "tab-dashboard", webpackPrefetch: true */
  )
);
const Theater = lazy(() =>
  import("Tablet/Theater/Theater" /* webpackChunkName: "tab-theater", webpackPrefetch: true */)
);
const Weather = lazy(() =>
  import("Tablet/Weather/Weather" /* webpackChunkName: "tab-weather", webpackPrefetch: true */)
);
const Nest = lazy(() =>
  import("Tablet/Nest/Nest" /* webpackChunkName: "tab-nest", webpackPrefetch: true */)
);
const Sensors = lazy(() =>
  import("Tablet/Sensors/Sensors" /* webpackChunkName: "tab-sensors", webpackPrefetch: true */)
);
const Autelis = lazy(() =>
  import("Tablet/Autelis/Autelis" /* webpackChunkName: "tab-autelis", webpackPrefetch: true */)
);
const SmartThings = lazy(() =>
  import(
    "Tablet/SmartThings/SmartThings" /* webpackChunkName: "tab-smartthings", webpackPrefetch: true */
  )
);

const tabs = new Map([
  ["dashboard", { component: Dashboard, name: "Dashboard", icon: "albums" }],
  ["theater", { component: Theater, name: "Theater", icon: "tv" }],
  ["weather", { component: Weather, name: "Weather", icon: "cloudy" }],
  ["nest", { component: Nest, name: "Nest", icon: "thermometer" }],
  ["sensors", { component: Sensors, name: "Sensors", icon: "pulse" }],
  ["autelis", { component: Autelis, name: "Pool/Spa", icon: "medical" }],
  ["smartthings", { component: SmartThings, name: "SmartThings", icon: "switch" }],
]);

const Navigation = ({ activeTab }) => (
  <IonTabBar slot="top">
    {Array.from(tabs).map(([id, cfg]) => (
      <IonTabButton tab={id} href={`/${id}`} key={id}>
        <IonIcon name={cfg.icon} />
        <IonLabel>{cfg.name}</IonLabel>
      </IonTabButton>
    ))}
  </IonTabBar>
);

const MainScreen = () => {
  return (
    <IonApp>
      <IonPage>
        <Navigation />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Switch>
          {Array.from(tabs).map(([id, cfg]) => (
            <Route path={`/:tab(${id})`} component={cfg.component} key={id} />
          ))}
        </Switch>
      </IonPage>
    </IonApp>
  );
};

export default MainScreen;
