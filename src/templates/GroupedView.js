// @ts-check
import React, { memo } from "react";
import { Route, Redirect } from "react-router";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonContent,
} from "@ionic/react";
import AnimatedDiv from "@/common/AnimatedDiv";

/**
 * @typedef TabType
 * @prop {string} route
 * @prop {string} name

 * @typedef {Object} GroupedViewProps
 * @prop {TabType[]} tabs Config key for this section
 * @prop {string} route Route for the section
 * @prop {(data: Object) => React.ReactNode} render Sub-tab content render prop
 * @param {GroupedViewProps} props
 */
const GroupedView = ({ tabs, route, render, ...rest }) => {
  if (!tabs) {
    // exit if no data available. This usually means that config is incomplete
    console.error(`Tabs not configured for route ${route}`);
    return null;
  }

  return (
    <IonContent {...rest}>
      <IonTabs>
        <IonRouterOutlet>
          {/* Render sub-routes */}
          {tabs.map(tab => (
            <Route
              path={`/${route}/:tab(${tab.route})`}
              render={() => render(tab)}
              key={tab.name}
            />
          ))}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          {/* Render tabbed navigation */}
          {tabs.map(tab => (
            <IonTabButton tab={tab.route} href={`/${route}/${tab.route}`} key={tab.route}>
              <AnimatedDiv
                animate={{
                  opacity: [0, 0, 1],
                  y: [100, 0],
                }}
                style={{
                  opacity: 0,
                }}
              >
                <IonLabel>{tab.name}</IonLabel>
              </AnimatedDiv>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
      {/* Navigate to the default tab */}
      <Route
        exact
        path={`/${route}`}
        render={() => <Redirect to={`/${route}/${tabs[0].route}`} />}
      />
    </IonContent>
  );
};
export default memo(GroupedView);
