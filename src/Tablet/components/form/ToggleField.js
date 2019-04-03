import React from "react";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginTop: 8, flex: 1 }}>{label}</div>
      <div className="float-right" style={{ whiteSpace: "nowrap" }}>
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              variant={toggled ? "dark" : undefined}
              onClick={() => {
                if (onToggle && !toggled) {
                  onToggle(true);
                }
              }}
            >
              On
            </Button>
            <Button
              variant={toggled ? undefined : "dark"}
              onClick={() => {
                if (onToggle && toggled) {
                  onToggle(false);
                }
              }}
            >
              Off
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  );
};

//
export default ToggleField;
