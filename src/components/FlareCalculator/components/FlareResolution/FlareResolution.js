import React, { Component } from 'react';
import { RESOLUTION_PRESETS } from '../../constants';
import { minWidth, maxWidth, minHeight, maxHeight } from '../../utils/flare-resolution';
import './FlareResolution.css';

class FlareResolution extends Component {
    state = {
        currentModel: this.props.model,
        preset: RESOLUTION_PRESETS[0]
    }

    loadPresets = () => {
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

    setMinMaxResolution = () => {
        let width = 0, height = 0;
        if (this.state.preset === 'Maximum') {
            width = maxWidth(this.props.model, this.props.format);
            height = maxHeight(this.props.model);
        } else if (this.state.preset === 'Minimum') {
            width = minWidth(this.props.link, this.props.model, this.props.format);
            height = minHeight(this.props.link, this.props.model);
        }

        this.props.updateState({ width: width, height: height });
    }

    handleChangePreset = (e) => {
        const preset = e.target.value;
        this.setState({ preset: preset }, (preset) => {
            if (this.state.preset === 'Maximum' || this.state.preset === 'Minimum') {
                this.setMinMaxResolution();
            } else {
                const resolution = this.state.preset.split('x');
                const width = resolution[0];
                const height = resolution[1];
                
                this.props.updateState({ width: width, height: height });
            }
        });
    }

    handleChangeWidth = (e) => {
        this.props.updateState({ width: e.target.value });
    }

    handleChangeHeight = (e) => {
        this.props.updateState({ height: e.target.value });
    }

    render = () => {
        // If model changes, and max/min selected, recalculate
        if (this.props.model !== this.state.currentModel) {
            this.setState({ currentModel: this.props.model });
            if (this.state.preset === 'Maximum' || this.state.preset === 'Minimum') {
                this.setMinMaxResolution();
            }
        }
        return (
            <fieldset>
            <legend>Resolution</legend>
                <div className='resolution-labels'>
                    <div className='resolution-label'>Presets:</div>
                    <div className='resolution-label'>W x H:</div>
                </div>
                <div className='resolution-controls'>
                    <select className='resolution-control' onChange={this.handleChangePreset}>
                        {this.loadPresets()}
                    </select>
                    <br />
                    <input type="number" className='resolution-control' min="1" max="9999" value={this.props.width} onChange={this.handleChangeWidth} />
                    <input type="number" className='resolution-control' min="1" max="9999" value={this.props.height} onChange={this.handleChangeHeight} />
                </div>
            </fieldset>
        );
    }
}

export default FlareResolution;