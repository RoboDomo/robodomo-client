import Config from '../../../Config'

import React from 'react'
import Toggle from 'react-bootstrap-toggle'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'

export default class ToggleField extends React.Component {
  constructor(props) {
    super()
    if (!props.name) {
      throw new Error('ToggleField: name prop required')
    }
  }
    
  render() {
    const rightPad = Config.screenSize === 'small' ? 25 : 50

    return (
      <FormGroup style={{ marginBottom: 8 }}>
        <Col
          sm={Config.ui.labelCol}
          componentClass={ControlLabel}
          style={{whiteSpace: 'nowrap', float: 'left'}}
        >
          {this.props.label}
        </Col>
        <Col
          sm={Config.ui.fieldCol}
          style={{textAlign: 'right', paddingRight: rightPad}}
        >
          <Toggle
            active={this.props.toggled}
            onClick={this.onToggle.bind(this)}
          />
        </Col>
      </FormGroup>
    )
  }
  // onClick={() => { this.props.onToggle(this.props.name, !this.props.toggled, this) }}
  onToggle(toggled) {
    if (this.props.onToggle) {
      this.props.onToggle(this.props.name, toggled, this)
    }
  }
}
