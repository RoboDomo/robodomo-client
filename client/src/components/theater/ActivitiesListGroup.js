import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default ({ activities, currentActivity, onClick }) => {
  if (!activities.length) {
    return null;
  }

  return (
    <ListGroup>
      <h5 style={{ marginTop: 0 }}>Activities</h5>
      {activities.map(activity => {
        return (
          <ListGroupItem
            active={currentActivity === activity.name}
            onClick={() => {
              onClick(activity);
            }}
            key={activity.name}
          >
            {activity.name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
