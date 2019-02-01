import Config from "Config";
import React, { Component } from "react";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";

export default class DisplayField extends Component {
  constructor() {
    super();
  }

  render() {
    const html = { __html: this.props.value };
    return (
      <FormGroup style={{ marginRight: 0, marginBottom: 0 }}>
        <Col
          sm={Config.ui.labelCol}
          componentClass={ControlLabel}
          style={{ whiteSpace: "nowrap", float: "left" }}
        >
          {this.props.label}
        </Col>
        <Col sm={Config.ui.FieldCol} style={{ textAlign: "right" }}>
          <FormControl.Static dangerouslySetInnerHTML={html} />
        </Col>
      </FormGroup>
    );
  }
}
