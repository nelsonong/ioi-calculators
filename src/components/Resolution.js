import React, { Component } from 'react';
import { RESOLUTION_PRESETS } from '../constants/flare';

class Resolution extends Component {
    constructor(props) {
        super(props);

        this.handleChangePreset = this.handleChangePreset.bind(this);
        this.handleChangeWidth = this.handleChangeWidth.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
    }

    loadPresets() {
        return RESOLUTION_PRESETS.map((preset, i) => {
            let presetString;
            if (preset === 'Maximum' || preset === 'Minimum') {
                presetString = preset;
            } else {
                presetString = preset[0] + 'x' + preset[1];
            }
            return <option key={i} value={presetString}>{presetString}</option>;
        });
    }

    handleChangePreset(e) {
        const preset = e.target.value;
        let resolution = [];
        if (preset === 'Maximum') {
            resolution[0] = 4096;
            resolution[1] = 3072
        } else if (preset === 'Minimum') {
            resolution[0] = 6;
            resolution[1] = 4;
        } else {
            resolution = preset.split('x');
        }

        this.props.updateState({ width: resolution[0], height: resolution[1] });
    }

    handleChangeWidth(e) {
        this.props.updateState({ width: e.target.value });
    }

    handleChangeHeight(e) {
        this.props.updateState({ height: e.target.value });
    }

    render() {
        return (
            <fieldset>
            <legend>Resolution</legend>
                <span>Presets:</span>&nbsp;&nbsp;
                <select onChange={this.handleChangePreset}>
                    {this.loadPresets()}
                </select>
                <br />
                <span>W x H:</span>&nbsp;&nbsp;
                <input type="number" min="6" max="4096" value={this.props.width} onChange={this.handleChangeWidth} />&nbsp;&nbsp;
                <input type="number" min="4" max="3072" value={this.props.height} onChange={this.handleChangeHeight} />
            </fieldset>
        );
    }
}

export default Resolution;