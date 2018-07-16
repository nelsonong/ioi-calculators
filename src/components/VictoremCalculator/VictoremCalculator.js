import React, { Component } from 'react';
import { VictoremModel, VictoremFormat, VictoremResolution, VictoremOptions, VictoremOutput } from './components';
import { MODEL, SENSOR, FORMAT, FORMATS, OPTION, RESOLUTION } from './constants';
import { getFormats } from './utils/getFormats';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { calculateDataRate } from './utils/calculateDataRate';
import { calculateMinWidth, calculateMaxWidth, calculateMinHeight, calculateMaxHeight, calculateWidthMultiple, calculateHeightMultiple} from './utils/resolution';
import { supports2x2Binning, supportsSubSampling, supportsVerticalBinning } from './utils/support';
import styles from './VictoremCalculator.css';
import CalculatorTopBar from '../CalculatorTopBar';

class VictoremCalculator extends Component {
    state = {
        model: MODEL.Type51B163MCX,             // Camera model
        sensor: SENSOR[MODEL.Type51B163MCX],    // Camera's sensor
        format: FORMAT.CXP2x1,                  // Current format selected
        formats: FORMATS.CXX,                   // Formats supported by camera
        bitDepth: 8,                            // Bit depth
        resolutionPreset: RESOLUTION.MAXIMUM,   // Resolution preset selected
        width: 2464,                            // Width
        widthStep: 16,                          // Acceptable width multiple
        maxWidth: 2464,
        height: 2056,                           // Height
        heightStep: 4,                          // Acceptable height multiple
        maxHeight: 2056,
        resolutionTooltip: '',                  // Warning if incorrect resolution multiple
        cameraOption: OPTION.NONE,              // Camera options [none, sub-sample, vertical bin, 2x2 bin]
        frameRate: 46.66,                       // Maximum frame-rate
        dataRate: 225.43,                       // Data-rate
        supports2x2Binning: true,               // 2x2 binning supported by camera
        supportsSubSampling: true,              // Sub-sampling supported by camera
        supportsVerticalBinning: true,          // Vertical binning supported by camera
        error: false,                           // Error occured with an input
    };

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value)) value = Number(value);
        this.setState(() => ({ [name]: value }));

        this.updateMinMaxResolution();
        this.updateOutput();
    }

    // Reset all fields with appropriate values on model change
    handleChangeModel = (e) => {
        const model = e.target.value;
        this.setState(() => ({
            model: model,
            sensor: SENSOR[model],
            format: FORMAT.CXP2x1,
            formats: getFormats(model),
            supports2x2Binning: supports2x2Binning(model),
            supportsSubSampling: supportsSubSampling(model),
            supportsVerticalBinning: supportsVerticalBinning(model),
            cameraOption: OPTION.NONE
        }));

        this.updateMinMaxResolution();
        this.updateOutput();
    }

    // Change resolution preset
    handleChangePreset = (e) => {
        const preset = e.target.value;
        if (preset === RESOLUTION.MINIMUM || preset === RESOLUTION.MAXIMUM) {
            this.setState(() => ({ resolutionPreset: preset }));
            this.updateMinMaxResolution();
        } else if (preset !== RESOLUTION.CUSTOM) {
            let [ width, height ] = preset.split('x');
            this.setState(() => ({ resolutionPreset: preset, width: Number(width), height: Number(height) }));
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
        this.setState((prevState) => {
            const resolutionPreset = prevState.resolutionPreset;
            if (resolutionPreset === RESOLUTION.MINIMUM) {
                return {
                    width: calculateMinWidth(prevState.model),
                    height: calculateMinHeight(prevState.model)
                };
            } else if (resolutionPreset === RESOLUTION.MAXIMUM) {
                return {
                    width: calculateMaxWidth(prevState),
                    height: calculateMaxHeight(prevState)
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
        const maxWidth = calculateMaxWidth(this.state);
        let withinBounds = width <= maxWidth;
        if (!withinBounds)
            return `Maximum width is ${maxWidth}px.`;
    
        // Validate max height
        const maxHeight = calculateMaxHeight(this.state);
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
                inModal={false}
                type={'Victorem'}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <VictoremModel
                sensor={this.state.sensor}
                handleChangeModel={this.handleChangeModel}
            />
            <VictoremFormat
                formats={this.state.formats}
                handleChange={this.handleChange}
            />
            <VictoremResolution
                resolutionPreset={this.state.resolutionPreset}
                width={this.state.width}
                widthStep={this.state.widthStep}
                maxWidth={this.state.maxWidth}
                height={this.state.height}
                heightStep={this.state.heightStep}
                maxHeight={this.state.maxHeight}
                resolutionTooltip={this.state.resolutionTooltip}
                handleChangePreset={this.handleChangePreset}
                handleChangeWidth={this.handleChangeWidth}
                handleChangeHeight={this.handleChangeHeight}
            />
            <VictoremOptions
                cameraOption={this.state.cameraOption}
                supports2x2Binning={this.state.supports2x2Binning}
                supportsSubSampling={this.state.supportsSubSampling}
                supportsVerticalBinning={this.state.supportsVerticalBinning}
                handleChange={this.handleChange}
            />
            <VictoremOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
                error={this.state.error}
            />
        </div>
    );
}

export default VictoremCalculator;
