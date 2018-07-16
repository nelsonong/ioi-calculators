import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCXModel, FlareCXFormat, FlareCXResolution, FlareCXOptions, FlareCXOutput } from './components';
import { MODEL, FORMATS, LINK_SPEEDS, RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { calculateDataRate } from './utils/calculateDataRate';
import { calculateMinWidth, calculateMaxWidth, calculateMinHeight, calculateMaxHeight, calculateWidthMultiple, calculateHeightMultiple } from './utils/resolution';
import styles from './FlareCXCalculator.css';

class FlareCXCalculator extends Component {
    state = {
        model: MODEL.Type2M280MCX,              // Camera model
        formats: FORMATS.CX2_4m,                // Current formats (changes based on model)
        bitDepth: 8,                            // Bit-depth (CoaXPress)
        linkCount: 1,                           // Link count (CoaXPress)
        linkSpeed: LINK_SPEEDS.CXP3,            // Link speed (CoaXPress)
        resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset
        width: 2048,                            // Resolution - width
        widthStep: 8,                           // Acceptable width multiple
        height: 1088,                           // Resolution - height
        heightStep: 2,                          // Acceptable height multiple
        resolutionTooltip: '',                  // Warning if incorrect resolution multiple
        subSampling: false,                     // Sub-sampling enabled
        frameRate: 132.72,                      // Maximum frame-rate
        dataRate: 282.03,                       // Data-rate (in MB/s)
        error: false,                           // Error occured with an input
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

        // Update formats
        let formats;
        if (model.startsWith('48M')) {
            formats = FORMATS.CX48m;
        } else if (model.startsWith('12M')) {
            formats = FORMATS.CX12m;
        } else {
            formats = FORMATS.CX2_4m;
        }

        // Update resolution multiples
        const widthStep = calculateWidthMultiple(model);
        const heightStep = calculateHeightMultiple(model);
        
        this.setState(() => ({ model, formats, widthStep, heightStep }));
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

    // Change width and set preset to 'Custom'
    handleChangeWidth = (e) => {
        const { value } = e.target;
        const width = Number(value);

        // Validate resolution
        const resolutionTooltip = this.validateResolution(width, this.state.height)
        const error = resolutionTooltip !== '';

        this.setState(() => ({ resolutionPreset: RESOLUTION.CUSTOM, width, resolutionTooltip, error }));
        this.updateOutput();
    }

    // Change height and set preset to 'Custom'
    handleChangeHeight = (e) => {
        const { value } = e.target;
        const height = Number(value);

        // Validate resolution
        const resolutionTooltip = this.validateResolution(this.state.width, height)
        const error = resolutionTooltip !== '';

        this.setState(() => ({ resolutionPreset: RESOLUTION.CUSTOM, height, resolutionTooltip, error }));
        this.updateOutput();
    }

    // Update minimum/maximum resolution
    updateMinMaxResolution = () => {
        this.setState(({ resolutionPreset, model }) => {
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: calculateMinWidth(model),
                    height: calculateMinHeight(model)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: calculateMaxWidth(model),
                    height: calculateMaxHeight(model)
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

    validateResolution = (width, height) => {
        const { model } = this.state;
        
        // Validate max width
        const maxWidth = calculateMaxWidth(model);
        let withinBounds = width <= maxWidth;
        if (!withinBounds)
            return `Maximum width is ${maxWidth}px.`;

        // Validate max height
        const maxHeight = calculateMaxHeight(model);
        withinBounds = height <= maxHeight;
        if (!withinBounds)
            return `Maximum height is ${maxHeight}px.`;
        
        // Validate width
        const widthStep = calculateWidthMultiple(model);
        let correctMultiple = (width % widthStep) === 0;
        if (!correctMultiple)
            return `Width must be a multiple of ${widthStep}.`;

        // Validate height
        const heightStep = calculateHeightMultiple(model);
        correctMultiple = (height % heightStep) === 0;
        if (!correctMultiple)
            return `Height must be a multiple of ${heightStep}.`;
        
        return '';
    }

    render = () => (
        <div className={styles.root}>
            <CalculatorTopBar
                inModal={this.state.mode}
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
                widthStep={this.state.widthStep}
                height={this.state.height}
                heightStep={this.state.heightStep}
                resolutionTooltip={this.state.resolutionTooltip}
                handleChangePreset={this.handleChangePreset}
                handleChangeWidth={this.handleChangeWidth}
                handleChangeHeight={this.handleChangeHeight}
            />
            <FlareCXOptions
                model={this.state.model}
                format={this.state.format}
                handleChange={this.handleChange}
            />
            <FlareCXOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
                error={this.state.error}
            />
        </div>
    );
}

FlareCXCalculator.defaultProps = {
    mode: false
}

export default FlareCXCalculator;
