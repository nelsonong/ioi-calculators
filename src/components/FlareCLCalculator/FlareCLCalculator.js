import React, { Component } from 'react';
import { FlareCLTitle, FlareCLModel, FlareCLHardwareVersion, FlareCLFormat, FlareCLResolution, FlareCLOptions, FlareCLFrameRate } from './components';
import { FORMAT, FORMATS, MODEL, MODE, RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/resolution';
import './FlareCLCalculator.css';

class FlareCLCalculator extends Component {
    state = {
        model: MODEL.Type2M360MCL,              // Camera model
        hwversion: 1,                           // Hardware version
        format: FORMAT.Output2x8,               // Link format (Camera Link)
        formats: FORMATS.CL2_4m,                // Current formats (changes based on model)
        resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset
        width: 2048,                            // Resolution - width
        height: 1088,                           // Resolution - height
        subSampling: false,                     // Sub-sampling enabled
        slowMode: false,                        // Slow-mode enabled
        frameRate: 70.95,                       // Maximum frame-rate
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

    // Update hardware version and formats
    handleChangeModel = (e) => {
        const model = e.target.value;
        
        // Default hardware version
        const isVersion2 = model.startsWith('12M');
        const hwversion = isVersion2 ? 2 : 1;

        // Formats
        let formats = model.startsWith('12M') ? FORMATS.CL12m : FORMATS.CL2_4m;
        const mode = this.props.mode;
        if (mode) {
            switch (mode) {
            case MODE.BASE:
                formats = formats.filter(clFormat => clFormat.startsWith('Base'));
                break;
            case MODE.FULL:
                formats = formats.filter(clFormat => !clFormat.startsWith('Base'));
                break;
            case MODE.DUAL_FULL:
                formats = formats.filter(clFormat => (clFormat.startsWith('80') || clFormat.startsWith('Dual')));
                break;
            }
        }
        
        this.setState(() => ({ model, hwversion, formats }));
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
        const { name, value } = e.target;
        this.setState(() => ({ resolutionPreset: RESOLUTION.CUSTOM, [name]: Number(value) }));
        this.updateFrameRate();
    }

    // Update minimum/maximum resolution
    updateMinMaxResolution = () => {
        this.setState((prevState) => {
            const resolutionPreset = prevState.resolutionPreset;
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: minWidth(prevState.model, prevState.format),
                    height: minHeight(prevState.model, prevState.format)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: maxWidth(prevState.model, prevState.format),
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
            <FlareCLTitle
                mode={this.state.mode}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <FlareCLModel
                mode={this.state.mode}
                handleChangeModel={this.handleChangeModel}
            />
            <FlareCLHardwareVersion
                model={this.state.model}
                hwversion={this.state.hwversion}
                handleChange={this.handleChange}
            />
            <FlareCLFormat
                formats={this.state.formats}
                mode={this.state.mode}
                handleChange={this.handleChange}
            />
            <FlareCLResolution
                resolutionPreset={this.state.resolutionPreset}
                width={this.state.width}
                height={this.state.height}
                handleChangePreset={this.handleChangePreset}
                handleChangeResolution={this.handleChangeResolution}
            />
            <FlareCLOptions
                model={this.state.model}
                format={this.state.format}
                handleChange={this.handleChange}
            />
            <FlareCLFrameRate
                frameRate={this.state.frameRate}
                width={this.state.width}
                height={this.state.height}
            />
        </div>
    );
}

FlareCLCalculator.defaultProps = {
    mode: false
}

export default FlareCLCalculator;
