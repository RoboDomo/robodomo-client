import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const ActivitiesListGroup = ({ activities, currentActivity, onClick }) => {
  if (!activities.length) {
    return null;
  }

  return (
    <ListGroup>
      <ListGroup.Item variant="dark">Activities</ListGroup.Item>
      {activities.map(activity => {
        return (
          <ListGroupItem
            active={currentActivity === activity.name}
            onClick={() => {
              onClick(activity);
            }}
            key={activity.name}
          >
            <div style={{ textAlign: "center" }}>{activity.name}</div>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
export default ActivitiesListGroup;
