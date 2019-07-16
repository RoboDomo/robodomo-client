import React from "react";
import TabbedView from "@/templates/TabbedView";

import TheaterTab from "./TheaterTab";

const Theater = () => (
  <TabbedView
    id="tab-theaters"
    section="theaters"
    route="theater"
    render={data => <TheaterTab theater={data} />}
  />
);

export default Theater;
