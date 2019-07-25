import React from "react";
import TabbedView from "@/templates/TabbedView";

import DashboardTab from "./DashboardTab";

const dashboards = () => (
  <TabbedView
    id="tab-dashboard"
    section="dashboards"
    route="dashboard"
    sectionKey="title"
    titleKey="title"
    render={dashboard => <DashboardTab dashboard={dashboard} />}
  />
);

export default dashboards;
