import React, { Component } from 'react';
import { LINK } from '../constants/flare';

class HardwareVersion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.updateState({ hwversion: Number(e.target.value) });
    }

    disableHWVersion() {
        return (this.props.link !== LINK.CL || !this.props.model.startsWith('12M'));
    }

    render() {
        return (
            <fieldset>
            <legend>Hardware Version</legend>
                <input type='radio' value={1} checked={this.props.hwversion === 1} disabled={this.disableHWVersion()} onChange={this.handleChange} />1&nbsp;
                <input type='radio' value={2} checked={this.props.hwversion === 2} disabled={this.disableHWVersion()} onChange={this.handleChange} />2
            </fieldset>
        );
    }
}

export default HardwareVersion;