import React, { Component } from 'react';
import { LINK } from '../../constants';
import './HardwareVersion.css';

class HardwareVersion extends Component {
    handleChange = (e) => {
        this.props.updateState({ hwversion: Number(e.target.value) });
    }

    disableHWVersion = () => {
        return (this.props.link !== LINK.CL || !this.props.model.startsWith('12M'));
    }

    render = () => {
        return (
            <fieldset>
            <legend>Hardware Version</legend>
                <input type='radio' value={1} checked={this.props.hwversion === 1} disabled={this.disableHWVersion()} onChange={this.handleChange} />
                <div className='hardware-version-label'>1</div>
                <input type='radio' value={2} checked={this.props.hwversion === 2} disabled={this.disableHWVersion()} onChange={this.handleChange} />
                <div className='hardware-version-label'>2</div>
            </fieldset>
        );
    }
}

export default HardwareVersion;