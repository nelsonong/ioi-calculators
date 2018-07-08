import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCLModel, FlareCLHardwareVersion, FlareCLFormat, FlareCLResolution, FlareCLOptions, FlareCLOutput } from './components';
import { FORMAT, FORMATS, MODEL, MODE, RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { calculateDataRate } from './utils/calculateDataRate';
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
        dataRate: 150.77,                       // Data-rate (in MB/s)
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
        this.updateOutput();
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
        this.updateOutput();
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

        this.updateOutput();
    }

    // Change resolution and set preset to 'Custom'
    handleChangeResolution = (e) => {
        const { name, value } = e.target;
        this.setState(() => ({ resolutionPreset: RESOLUTION.CUSTOM, [name]: Number(value) }));
        this.updateOutput();
    }

    // Update minimum/maximum resolution
    updateMinMaxResolution = () => {
        this.setState(({ resolutionPreset, model, format }) => {
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: minWidth(model, format),
                    height: minHeight(model, format)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: maxWidth(model, format),
                    height: maxHeight(model)
                }
            };
        });
    }

    // Update output
    updateOutput = () => {
        this.setState((prevState) => {
            const frameRate = calculateFrameRate({ ...prevState });
            const dataRate = calculateDataRate({ ...prevState, frameRate });
            return { frameRate, dataRate };
        });
    }

    render = () => (
        <div className="flare-calculator">
            <CalculatorTopBar
                mode={this.state.mode}
                type={'Flare CL'}
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
            <FlareCLOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
            />
        </div>
    );
}

FlareCLCalculator.defaultProps = {
    mode: false
}

export default FlareCLCalculator;
