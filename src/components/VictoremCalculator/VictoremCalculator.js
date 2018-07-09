import React, { Component } from 'react';
import { VictoremModel, VictoremModelInfo, VictoremFormat, VictoremResolution, VictoremOptions, VictoremFrameRate } from './components';
import { VIC_MODEL, VIC_SENSOR, VIC_FORMAT, VIC_FORMATS, VIC_OPTION, VIC_RESOLUTION, VIC_MAX_RESOLUTION } from './constants';
import { getFormats } from './utils/victorem-format';
import { calculateFrameRate } from './utils/victorem-frame-rate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/victorem-resolution';
import { supports2x2Binning, supportsSubSampling, supportsVerticalBinning } from './utils/victorem-support';
import styles from './VictoremCalculator.css';
import CalculatorTopBar from '../CalculatorTopBar';

class VictoremCalculator extends Component {
    state = {
        model: VIC_MODEL.Type51B163MCX,                             // Camera model
        sensor: VIC_SENSOR[VIC_MODEL.Type51B163MCX],                // Camera's sensor
        maxWidth: VIC_MAX_RESOLUTION[VIC_MODEL.Type51B163MCX][0],   // Max width of camera
        maxHeight: VIC_MAX_RESOLUTION[VIC_MODEL.Type51B163MCX][1],  // Max height of camera
        format: VIC_FORMAT.CXP2x1,                                  // Current format selected
        formats: VIC_FORMATS.CXX,                                   // Formats supported by camera
        bitDepth: 8,                                                // Bit depth
        resolutionPreset: VIC_RESOLUTION.MAXIMUM,                   // Resolution preset selected
        width: 2464,                                                // Width
        height: 2056,                                               // Height
        cameraOption: VIC_OPTION.NONE,                              // Camera options [none, sub-sample, vertical bin, 2x2 bin]
        frameRate: '46.66 FPS [2464 x 2056]',                       // Maximum frame-rate
        supports2x2Binning: true,                                   // 2x2 binning supported by camera
        supportsSubSampling: true,                                  // Sub-sampling supported by camera
        supportsVerticalBinning: true                               // Vertical binning supported by camera
    };

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value)) value = Number(value);
        this.setState(() => ({ [name]: value }));

        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Reset all fields with appropriate values on model change
    handleChangeModel = (e) => {
        const model = e.target.value;
        this.setState(() => ({
            model: model,
            sensor: VIC_SENSOR[model],
            maxWidth: VIC_MAX_RESOLUTION[model][0],
            maxHeight: VIC_MAX_RESOLUTION[model][1],
            format: VIC_FORMAT.CXP2x1,
            formats: getFormats(model),
            supports2x2Binning: supports2x2Binning(model),
            supportsSubSampling: supportsSubSampling(model),
            supportsVerticalBinning: supportsVerticalBinning(model),
            cameraOption: VIC_OPTION.NONE
        }));

        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Change resolution preset
    handleChangePreset = (e) => {
        const preset = e.target.value;
        if (preset === VIC_RESOLUTION.MINIMUM || preset === VIC_RESOLUTION.MAXIMUM) {
            this.setState(() => ({ resolutionPreset: preset }));
            this.updateMinMaxResolution();
        } else if (preset !== VIC_RESOLUTION.CUSTOM) {
            let [ width, height ] = preset.split('x');
            this.setState(() => ({ resolutionPreset: preset, width: Number(width), height: Number(height) }));
        }

        this.updateFrameRate();
    }

    // Change resolution and set preset to 'Custom'
    handleChangeResolution = (e) => {
        let { name, value } = e.target;
        this.setState(() => ({ resolutionPreset: VIC_RESOLUTION.CUSTOM, [name]: Number(value) }));

        this.updateFrameRate();
    }

    // Update minimum/maximum resolution
    updateMinMaxResolution = () => {
        this.setState((prevState) => {
            const resolutionPreset = prevState.resolutionPreset;
            if (resolutionPreset === VIC_RESOLUTION.MINIMUM) {
                return {
                    width: minWidth(prevState.model),
                    height: minHeight(prevState.model)
                };
            } else if (resolutionPreset === VIC_RESOLUTION.MAXIMUM) {
                return {
                    width: maxWidth({...prevState}),
                    height: maxHeight({...prevState})
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
        <div className={styles.root}>
            <CalculatorTopBar
                inModal={false}
                type={'Victorem'}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <VictoremModel
                model={this.state.model}
                handleChangeModel={this.handleChangeModel}
            />
            <VictoremModelInfo
                sensor={this.state.sensor}
                maxWidth={this.state.maxWidth}
                maxHeight={this.state.maxHeight}
            />
            <VictoremFormat
                formats={this.state.formats}
                handleChange={this.handleChange}
            />
            <VictoremResolution
                resolutionPreset={this.state.resolutionPreset}
                width={this.state.width}
                height={this.state.height}
                cameraOption={this.state.cameraOption}
                handleChangePreset={this.handleChangePreset}
                handleChangeResolution={this.handleChangeResolution}
            />
            <VictoremOptions
                cameraOption={this.state.cameraOption}
                supports2x2Binning={this.state.supports2x2Binning}
                supportsSubSampling={this.state.supportsSubSampling}
                supportsVerticalBinning={this.state.supportsVerticalBinning}
                handleChange={this.handleChange}
            />
            <VictoremFrameRate
                frameRate={this.state.frameRate}
            />
        </div>
    );
}

export default VictoremCalculator;
