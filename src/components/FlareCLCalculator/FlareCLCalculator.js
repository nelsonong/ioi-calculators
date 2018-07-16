import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { FlareCLModel, FlareCLFormat, FlareCLResolution, FlareCLOptions, FlareCLOutput } from './components';
import { FORMAT, FORMATS, MODEL, MODE, RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { calculateDataRate } from './utils/calculateDataRate';
import { calculateMinWidth, calculateMaxWidth, calculateMinHeight, calculateMaxHeight, calculateWidthMultiple, calculateHeightMultiple } from './utils/resolution';
import styles from './FlareCLCalculator.css';

class FlareCLCalculator extends Component {
    state = {
        model: MODEL.Type2M360MCL,              // Camera model
        hwversion: 1,                           // Hardware version
        format: FORMAT.Output2x8,               // Link format (Camera Link)
        formats: FORMATS.CL2_4m,                // Current formats (changes based on model)
        resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset
        width: 2048,                            // Resolution - width
        widthStep: 8,                           // Acceptable width multiple
        height: 1088,                           // Resolution - height
        heightStep: 2,                          // Acceptable height multiple
        resolutionTooltip: '',                  // Warning if incorrect resolution multiple
        subSampling: false,                     // Sub-sampling enabled
        slowMode: false,                        // Slow-mode enabled
        frameRate: 70.95,                       // Maximum frame-rate
        dataRate: 150.77,                       // Data-rate (in MB/s)
        error: false,                           // Error occured with an input
        mode: this.props.mode                   // Mode (Base or Full if in DVR calculator)
    };

    componentDidMount = () => {
        const { model, mode } = this.state;
        let formats = model.startsWith('12M') ? FORMATS.CL12m : FORMATS.CL2_4m;
        if (mode) {
            formats = this.filterFormats(formats, mode);
            this.setState(() => ({ formats }));
        }
    }

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
        const mode = this.state.mode;
        if (mode) {
            formats = this.filterFormats(formats, mode);
        }

        // Height multiple
        const heightStep = calculateHeightMultiple(model);
        
        this.setState(() => ({ model, hwversion, formats, heightStep}));
        this.updateMinMaxResolution();
        this.updateOutput();
    }

    handleChangeFormat = (e) => {
        const { value: format } = e.target;
        const widthStep = calculateWidthMultiple(format);
        this.setState(() => ({ format, widthStep }));
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
        this.setState(({ resolutionPreset, model, format }) => {
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: calculateMinWidth(model, format),
                    height: calculateMinHeight(model, format)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: calculateMaxWidth(model, format),
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

    filterFormats = (formats, mode) => {
        switch (mode) {
            case MODE.BASE:
                return formats.filter(clFormat => clFormat.startsWith('Base'));
            case MODE.FULL:
                return formats.filter(clFormat => !clFormat.startsWith('Base'));
            case MODE.DUAL_FULL:
                return formats.filter(clFormat => (clFormat.startsWith('80') || clFormat.startsWith('Dual')));
            default:
                throw new Error('Mode not found.');
        }
    }

    validateResolution = (width, height) => {
        const { model, format } = this.state;
        
        // Validate max width
        const maxWidth = calculateMaxWidth(model, format);
        let withinBounds = width <= maxWidth;
        if (!withinBounds)
            return `Maximum width is ${maxWidth}px.`;

        // Validate max height
        const maxHeight = calculateMaxHeight(model);
        withinBounds = height <= maxHeight;
        if (!withinBounds)
            return `Maximum height is ${maxHeight}px.`;
        
        // Validate width
        const widthStep = calculateWidthMultiple(format);
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
                type={'Flare CL'}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <FlareCLModel
                mode={this.state.mode}
                handleChangeModel={this.handleChangeModel}
            />
            <FlareCLFormat
                formats={this.state.formats}
                mode={this.state.mode}
                handleChange={this.handleChange}
            />
            <FlareCLResolution
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
            <FlareCLOptions
                model={this.state.model}
                format={this.state.format}
                handleChange={this.handleChange}
            />
            <FlareCLOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
                error={this.state.error}
            />
        </div>
    );
}

FlareCLCalculator.defaultProps = {
    mode: false
}

export default FlareCLCalculator;
