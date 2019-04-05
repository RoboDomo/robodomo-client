import React, { useState, useRef } from "react";

import { Tab, Tabs } from "react-bootstrap";
import SmartThingsTab from "./SmartThingsTab";

import Config from "Config";

const LOCALSTORAGE_KEY = "smartthingsTabletTabs";

const SmartThings = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY) || "0"
  );
  const rooms = useRef(null);

  if (!rooms.current) {
    try {
      const roomsMap = {
        All: []
      };

      for (const thing of Config.smartthings.things) {
        roomsMap.All.push(thing);
        for (const room of thing.rooms) {
          if (room !== "*") {
            roomsMap[room] = roomsMap[room] || [];
            roomsMap[room].push(thing);
          }
        }
      }

      for (const thing of Config.smartthings.things) {
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
      rooms.current = [];
      for (const name in roomsMap) {
        rooms.current.push({
          name: name,
          things: roomsMap[name]
        });
      }
    } catch (e) {
      console.log("exception", e);
    }
  }

  return (
    <Tabs
      id="smartthings-tabs"
      onSelect={eventKey => {
        localStorage.setItem(LOCALSTORAGE_KEY, eventKey);
        setActiveTab(eventKey);
      }}
      activeKey={activeTab}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {rooms.current.map((room, ndx) => {
        const key = `smartthings-room-${room.name}${ndx}`;
        return (
          <Tab
            title={room.name}
            eventKey={ndx}
            key={key}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <SmartThingsTab room={room} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default SmartThings;
