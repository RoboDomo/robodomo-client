import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const ActivitiesListGroup = ({ activities, currentActivity, onClick }) => {
  if (!activities.length) {
    return null;
  }
  // <ListGroup.Item variant="dark">Activities</ListGroup.Item>
  return (
    <ListGroup variant="flush">
      <div style={{ fontWeight: "bold", textAlign: "center" }}>Activities</div>
      {activities.map(activity => {
        return (
          <ListGroupItem
            style={{ height: 44 }}
            variant={currentActivity === activity.name ? "success" : undefined}
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
