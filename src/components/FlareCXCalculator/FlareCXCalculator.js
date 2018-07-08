import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCXModel, FlareCXFormat, FlareCXResolution, FlareCXOptions, FlareCXOutput } from './components';
import { MODEL, FORMATS, LINK_SPEEDS, RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { calculateDataRate } from './utils/calculateDataRate';
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
        dataRate: 282.03,                       // Data-rate (in MB/s)
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
        this.setState(({ resolutionPreset, model }) => {
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: minWidth(model),
                    height: minHeight(model)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: maxWidth(model),
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
                type={'Flare CX'}
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
            <FlareCXOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
            />
        </div>
    );
}

FlareCXCalculator.defaultProps = {
    mode: false
}

export default FlareCXCalculator;
