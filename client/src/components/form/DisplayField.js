import Config from "Config";
import React, { Component } from "react";

import { FormGroup, ControlLabel, Col, FormControl } from "react-bootstrap";

const DisplayField = ({ label, value }) => {
  const html = { __html: value };
  return (
    <FormGroup style={{ marginRight: 0, marginBottom: 0 }}>
      <Col
        sm={Config.ui.labelCol}
        componentClass={ControlLabel}
        style={{ whiteSpace: "nowrap", float: "left" }}
      >
        {label}
      </Col>
      <Col sm={Config.ui.FieldCol} style={{ textAlign: "right" }}>
        <FormControl.Static dangerouslySetInnerHTML={html} />
      </Col>
    </FormGroup>
  );
};
export default DisplayField;
