import React from "react";
import { toRoute } from "@/lib/routing";
import GroupedView from "@/templates/GroupedView";
import useConfig from "@/hooks/useConfig";
import ThermostatTab from "./ThermostatTab";
import ProtectTab from "./ProtectTab";

const Nest = () => {
  const config = useConfig();

  const nest = config && config.nest;

  if (!nest) {
    console.error(`Nest config doesn't exist`);
    return null;
  }

  const devices = Object.keys(nest).reduce((collection, type) => {
    if (type === "thermostats") {
      return collection.concat(
        nest[type].map(device => ({
          name: device.name,
          route: toRoute(device.name),
          render: () => <ThermostatTab thermostat={device} />,
        }))
      );
    }

    if (type === "protects") {
      return collection.concat(
        nest[type].map(device => ({
          name: device.name,
          route: toRoute(device.name),
          render: () => <ProtectTab sensor={device} />,
        }))
      );
    }

    return collection;
  }, []);

  return (
    <GroupedView id="tab-nest" tabs={devices} route="nest" render={device => device.render()} />
  );
};

export default Nest;

// /**
//  * Screen to control Nest products (thermostat, nest protect)
//  */
// import React, { useState } from "react";
// import { IonContent } from "@ionic/react";
// import useConfig from "@/hooks/useConfig";

// import { Tab, Tabs } from "react-bootstrap";
// import ThermostatTab from "./ThermostatTab";
// import ProtectTab from "./ProtectTab";

// const LOCALSTORAGE_KEY = "nestTabState";

// const Nest = () => {
//   const config = useConfig();
//   const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "0");

//   if (!config || !config.nest) {
//     return null;
//   }

//   return (
//     <IonContent id="tab-nest">
//       <Tabs
//         id="nest-tabs"
//         onSelect={eventKey => {
//           localStorage.setItem(LOCALSTORAGE_KEY, eventKey);
//           setActiveTab(eventKey);
//         }}
//         activeKey={activeTab}
//         variant="pills"
//         mountOnEnter
//         unmountOnExit
//       >
//         {Array.isArray(config.nest.thermostats)
//           ? config.nest.thermostats.map(thermostat => {
//               return (
//                 <Tab title={thermostat.name} eventKey={thermostat.name} key={thermostat.name}>
//                   <ThermostatTab thermostat={thermostat} />
//                 </Tab>
//               );
//             })
//           : null}
//         {Array.isArray(config.nest.protects)
//           ? config.nest.protects.map(protect => {
//               return (
//                 <Tab title={protect.name} eventKey={protect.name} key={protect.name}>
//                   <ProtectTab sensor={protect} />
//                 </Tab>
//               );
//             })
//           : null}
//       </Tabs>
//     </IonContent>
//   );
// };

// export default Nest;
