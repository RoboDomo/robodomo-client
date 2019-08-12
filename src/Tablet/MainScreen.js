/**
 * Tablet MainScreen component
 *
 * Implements the top bar as tabs and renders app content below
 */

import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import s from "./MainScreen.module.css";

import {
  IonApp,
  IonPage,
  IonContent,
  IonMenu,
  IonList,
  IonListHeader,
  IonIcon,
  IonLabel,
  IonToggle,
  IonItem,
  IonHeader,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonMenuButton,
  IonSplitPane,
} from "@ionic/react";
import AnimatedDiv from "@/common/AnimatedDiv";
import useDarkMode from "../hooks/useDarkMode";

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

const Navigation = ({ activeTab, dark, setDark }) => (
  <IonMenu side="start" contentId="main" type="push">
    <IonContent>
      <IonList>
        {Array.from(tabs).map(([id, cfg]) => (
          <NavLink replace className={s.link} activeClassName={s.activeLink} to={`/${id}`}>
            <IonItem button>
              <IonIcon name={cfg.icon} slot="start" />
              <IonLabel>{cfg.name}</IonLabel>
            </IonItem>
          </NavLink>
        ))}
      </IonList>
      <IonList>
        <IonListHeader>OPTIONS</IonListHeader>
        <IonItem>
          <IonToggle onClick={e => setDark(e.target.checked)} checked={dark} slot="end" />
          <IonLabel>Dark Mode: {dark ? "On" : "Off"}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
);

const MainScreen = () => {
  const [dark, setDark] = useDarkMode();

  return (
    <div className={`${dark ? "dark" : "light"}`}>
      <IonApp>
        <AnimatedDiv
          animate={{
            opacity: [0, 0, 1],
            y: [-100, 0],
          }}
          style={{
            opacity: 0,
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Robodomo Client</IonTitle>
            </IonToolbar>
          </IonHeader>
        </AnimatedDiv>
        <IonSplitPane contentId="main" className={s.splitPane}>
          <Navigation dark={dark} setDark={setDark} />
          <IonPage id="main">
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Switch>
              {Array.from(tabs).map(([id, cfg]) => (
                <Route path={`/${id}`} component={cfg.component} key={id} />
              ))}
            </Switch>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    </div>
  );
};

export default MainScreen;
