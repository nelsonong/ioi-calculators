import React, { Component } from 'react';
import { FlareCXTitle, FlareCXModel, FlareCXFormat, FlareCXResolution, FlareCXOptions, FlareCXFrameRate } from './components';
import { MODEL, FORMATS, LINK_SPEEDS, RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/resolution';
import './FlareCXCalculator.css';

class FlareCXCalculator extends Component {
    state = {
        model: MODEL.Type2M280MCX,              // Camera model
        formats: FORMATS.CX2_4m,                // Current formats (changes based on model)
        bitDepth: 8,                            // Bit-depth (CoaXPress)
        linkCount: 1,                           // Link count (CoaXPress)
        linkSpeed: LINK_SPEEDS.CXP3,            // Link speed (CoaXPress)
        resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset
        width: 2048,                            // Resolution - width
        height: 1088,                           // Resolution - height
        subSampling: false,                     // Sub-sampling enabled
        frameRate: 132.72,                      // Maximum frame-rate
        mode: this.props.mode                   // Mode (Base or Full if in DVR calculator)
    };

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        const { name, checked } = e.target;
        let { value } = e.target;
        if (!isNaN(value)) value = Number(value);
        if (checked !== undefined) value = checked;
        this.setState(() => ({ [name]: value }));

        this.updateMinMaxResolution();
        this.updateFrameRate();
    }
    
    // Update model and formats
    handleChangeModel = (e) => {
        const model = e.target.value;

        let formats;
        if (model.startsWith('48M')) {
            formats = FORMATS.CX48m;
        } else if (model.startsWith('12M')) {
            formats = FORMATS.CX12m;
        } else {
            formats = FORMATS.CX2_4m;
        }
        
        this.setState(() => ({ model, formats }));
        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Change resolution preset
    handleChangePreset = (e) => {
        const resolutionPreset = e.target.value;
        if (resolutionPreset === RESOLUTION.CUSTOM) {
            this.setState(() => ({ resolutionPreset }));
        } else if ([ RESOLUTION.MINIMUM, RESOLUTION.MAXIMUM ].includes(resolutionPreset)) {
            this.setState(() => ({ resolutionPreset }));
            this.updateMinMaxResolution();
        } else {
            const [ width, height ] = resolutionPreset.split('x');
            this.setState(() => ({ resolutionPreset, width: Number(width), height: Number(height) }));
        }

        this.updateFrameRate();
    }

    // Change resolution and set preset to 'Custom'
    handleChangeResolution = (e) => {
        let { name, value } = e.target;
        this.setState(() => ({ resolutionPreset: RESOLUTION.CUSTOM, [name]: Number(value) }));
        this.updateFrameRate();
    }

    // Update minimum/maximum resolution
    updateMinMaxResolution = () => {
        this.setState((prevState) => {
            const resolutionPreset = prevState.resolutionPreset;
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: minWidth(prevState.model),
                    height: minHeight(prevState.model)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: maxWidth(prevState.model),
                    height: maxHeight(prevState.model)
                }
            };
        });
    }

    // Update frame-rate
    updateFrameRate = () => {
        this.setState((prevState) => ({
            frameRate: calculateFrameRate({...prevState})
        }));
    }

    render = () => (
        <div className="flare-calculator">
            <FlareCXTitle
                mode={this.state.mode}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <FlareCXModel
                mode={this.state.mode}
                handleChangeModel={this.handleChangeModel}
            />
            <FlareCXFormat
                formats={this.state.formats}
                mode={this.state.mode}
                handleChange={this.handleChange}
            />
            <FlareCXResolution
                resolutionPreset={this.state.resolutionPreset}
                width={this.state.width}
                height={this.state.height}
                handleChangePreset={this.handleChangePreset}
                handleChangeResolution={this.handleChangeResolution}
            />
            <FlareCXOptions
                model={this.state.model}
                format={this.state.format}
                handleChange={this.handleChange}
            />
            <FlareCXFrameRate
                frameRate={this.state.frameRate}
                width={this.state.width}
                height={this.state.height}
            />
        </div>
    );
}

FlareCXCalculator.defaultProps = {
    mode: false
}

export default FlareCXCalculator;
