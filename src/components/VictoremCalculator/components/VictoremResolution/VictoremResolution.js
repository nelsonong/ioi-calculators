import React, { Component } from 'react';
import { RESOLUTION, RESOLUTIONS, CAMERA_OPTION } from '../../constants';
import './VictoremResolution.css';

class VictoremResolution extends Component {
    loadPresets = () => {
        return RESOLUTIONS.map((preset, i) => {
            let presetString;
            if ([RESOLUTION.MINIMUM, RESOLUTION.MAXIMUM, RESOLUTION.CUSTOM].includes(preset)) {
                presetString = preset;
            } else {
                presetString = preset[0] + 'x' + preset[1];
            }
            return <option key={i} value={presetString}>{presetString}</option>;
        });
    }

    handleChangePreset = (e) => {
        const preset = e.target.value;
        if (preset === 'Custom') {
            return;
        } else if (preset === RESOLUTION.MINIMUM || preset === RESOLUTION.MAXIMUM) {
            this.props.updateState({ resolutionPreset: preset });
        } else {
            const resolution = preset.split('x');
            const width = resolution[0];
            const height = resolution[1];
            
            this.props.updateState({ resolutionPreset: preset, width: Number(width), height: Number(height) });
        }
    }

    handleChangeWidth = (e) => {
        this.props.updateState({ resolutionPreset: RESOLUTION.CUSTOM, width: Number(e.target.value) });  // Set selected preset to 'Custom'
    }

    handleChangeHeight = (e) => {
        this.props.updateState({ resolutionPreset: RESOLUTION.CUSTOM, height: Number(e.target.value) });  // Set selected preset to 'Custom'
    }

    render = () => {
        const subSamplingSelected = (this.props.cameraOption === CAMERA_OPTION.SUBSAMPLING);
        return (
            <fieldset>
            <legend>Resolution</legend>
                <div className='resolution-labels'>
                    <div className='resolution-label'>Presets:</div>
                    <div className='resolution-label'>W x H:</div>
                </div>
                <div className='resolution-controls'>
                    <select className='resolution-control' value={this.props.resolutionPreset} disabled={subSamplingSelected} onChange={this.handleChangePreset}>
                        {this.loadPresets()}
                    </select>
                    <br />
                    <input type="number" className='resolution-control' min="1" max="9999" value={this.props.width} disabled={subSamplingSelected} onChange={this.handleChangeWidth} />
                    <input type="number" className='resolution-control' min="1" max="9999" value={this.props.height} disabled={subSamplingSelected} onChange={this.handleChangeHeight} />
                </div>
            </fieldset>
        );
    }
}

export default VictoremResolution;