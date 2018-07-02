import React, { Component } from 'react';
import { VictoremModel, VictoremModelInfo, VictoremFormat, VictoremResolution, VictoremOptions, VictoremFrameRate } from './components';
import { MODEL, SENSOR, FORMAT, FORMATS, CAMERA_OPTION, RESOLUTION, MAX_RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/victorem-frame-rate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/victorem-resolution';
import './VictoremCalculator.css';

class VictoremCalculator extends Component {
    state = {
        model: MODEL.Type51B163MCX,                             // Camera model
        sensor: SENSOR[MODEL.Type51B163MCX],                    // Camera's sensor
        maxWidth: MAX_RESOLUTION[MODEL.Type51B163MCX][0],       // Max width of camera
        maxHeight: MAX_RESOLUTION[MODEL.Type51B163MCX][1],      // Max height of camera
        format: FORMAT.CXP2x1,                                  // Current format selected
        formats: FORMATS.CXX,                                   // Formats supported by camera
        bitDepth: 8,                                            // Bit depth
        resolutionPreset: RESOLUTION.MAXIMUM,                   // Resolution preset selected
        width: 2464,                                            // Width
        height: 2056,                                           // Height
        cameraOption: CAMERA_OPTION.NONE,                       // Camera options [none, sub-sample, vertical bin, 2x2 bin]
        frameRate: 'N/A',                                       // Maximum frame-rate
        supportsSubSampling: true,                              // Sub-sampling supported by camera
        supportsVerticalBinning: true,                          // Vertical binning supported by camera
        supports2x2Binning: true                                // 2x2 binning supported by camera
    };

    // Update state and recalculate frame-rate
    updateState = (newState) => {
        const resolutionPreset = this.state.resolutionPreset;
        this.setState(newState, () => {
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                this.setMinResolution();
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                this.setMaxResolution();
            } else {
                this.setState({ frameRate: calculateFrameRate({...this.state}) });
            }
        });
    }

    // Set minimum resolution and recalculate frame-rate
    setMinResolution = () => {
        this.setState({ width: minWidth(this.state.model), height: minHeight(this.state.model) }, () => {
            this.setState({ frameRate: calculateFrameRate({...this.state}) });
        });
    }

    // Set maximum resolution and recalculate frame-rate
    setMaxResolution = () => {
        this.setState({ width: maxWidth({...this.state}), height: maxHeight({...this.state}) }, () => {
            this.setState({ frameRate: calculateFrameRate({...this.state}) });
        });
    }

    render = () => {
        return (
            <div className="victorem-calculator">
                <div>
                    <div className='victorem-calculator-title'>Victorem Frame Rate Calculator</div>
                    <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
                </div>
                <VictoremModel
                    model={this.state.model}
                    updateState={this.updateState}
                />
                <VictoremModelInfo
                    sensor={this.state.sensor}
                    maxWidth={this.state.maxWidth}
                    maxHeight={this.state.maxHeight}
                />
                <VictoremFormat
                    formats={this.state.formats}
                    updateState={this.updateState}
                />
                <VictoremResolution
                    {...this.state}
                    resolutionPreset={this.state.resolutionPreset}
                    cameraOption={this.state.cameraOption}
                    updateState={this.updateState}
                />
                <VictoremOptions
                    cameraOption={this.state.cameraOption}
                    supportsSubSampling={this.state.supportsSubSampling}
                    supportsVerticalBinning={this.state.supportsVerticalBinning}
                    supports2x2Binning={this.state.supports2x2Binning}
                    updateState={this.updateState}
                />
                <VictoremFrameRate
                    frameRate={this.state.frameRate}
                />
            </div>
        );
    }
}

export default VictoremCalculator;
