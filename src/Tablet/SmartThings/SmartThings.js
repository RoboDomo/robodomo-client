import React from "react";
import { memoize } from "lodash-es";
import { toRoute } from "@/lib/routing";
import GroupedView from "@/templates/GroupedView";
import useConfigGroup from "@/hooks/useConfigGroup";
import SmartThingsTab from "./SmartThingsTab";

const getGroups = memoize(things => {
  const roomsMap = {
    All: [],
  };

  for (const thing of things) {
    roomsMap.All.push(thing);
    for (const room of thing.rooms) {
      if (room !== "*") {
        roomsMap[room] = roomsMap[room] || [];
        roomsMap[room].push(thing);
      }
    }
  }

  for (const thing of things) {
    for (const room of thing.rooms) {
      if (room === "*") {
        for (const r in roomsMap) {
          if (r !== "All") {
            roomsMap[r].push(thing);
          }
        }
      }
    }
  }

  // flatten rooms
  const groups = [];
  for (const name in roomsMap) {
    groups.push({
      name: name,
      things: roomsMap[name],
      route: toRoute(name),
    });
  }

  return groups;
});

const SmartThings = () => {
  const [things] = useConfigGroup("smartthings.things");

  if (!things) {
    console.error(`SmartThings config doesn't exist`);
    return null;
  }

  const groups = getGroups(things);

  return (
    <GroupedView
      id="tab-smartthings"
      tabs={groups}
      route="smartthings"
      render={room => <SmartThingsTab room={room} />}
    />
  );
};

export default SmartThings;
