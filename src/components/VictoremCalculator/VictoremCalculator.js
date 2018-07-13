import React, { Component } from 'react';
import { VictoremModel, VictoremFormat, VictoremResolution, VictoremOptions, VictoremOutput } from './components';
import { MODEL, SENSOR, FORMAT, FORMATS, OPTION, RESOLUTION } from './constants';
import { getFormats } from './utils/getFormats';
import { calculateFrameRate } from './utils/calculateFrameRate';
import { calculateDataRate } from './utils/calculateDataRate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/resolution';
import { supports2x2Binning, supportsSubSampling, supportsVerticalBinning } from './utils/support';
import styles from './VictoremCalculator.css';
import CalculatorTopBar from '../CalculatorTopBar';

class VictoremCalculator extends Component {
    state = {
        model: MODEL.Type51B163MCX,                             // Camera model
        sensor: SENSOR[MODEL.Type51B163MCX],                    // Camera's sensor
        format: FORMAT.CXP2x1,                                  // Current format selected
        formats: FORMATS.CXX,                                   // Formats supported by camera
        bitDepth: 8,                                            // Bit depth
        resolutionPreset: RESOLUTION.MAXIMUM,                   // Resolution preset selected
        width: 2464,                                            // Width
        height: 2056,                                           // Height
        cameraOption: OPTION.NONE,                              // Camera options [none, sub-sample, vertical bin, 2x2 bin]
        frameRate: 46.66,                                       // Maximum frame-rate
        dataRate: 225.43,                                       // Data-rate
        supports2x2Binning: true,                               // 2x2 binning supported by camera
        supportsSubSampling: true,                              // Sub-sampling supported by camera
        supportsVerticalBinning: true                           // Vertical binning supported by camera
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

    // Change resolution and set preset to 'Custom'
    handleChangeResolution = (e) => {
        let { name, value } = e.target;
        this.setState(() => ({ resolutionPreset: RESOLUTION.CUSTOM, [name]: Number(value) }));

        this.updateOutput();
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
                    width: maxWidth({...prevState}),
                    height: maxHeight({...prevState})
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
            <VictoremOutput
                frameRate={this.state.frameRate}
                dataRate={this.state.dataRate}
            />
        </div>
    );
}

export default VictoremCalculator;
