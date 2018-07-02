import React, { Component } from 'react';
import { FlareCLFormat, FlareCXFormat, FlareHardwareVersion, FlareFrameRate, FlareOptions, FlareModel, FlareResolution } from './components';
import { FLARE_LINK, FLARE_CL_FORMAT, FLARE_CL_FORMATS, FLARE_CL_MODEL, FLARE_CL_MODELS,
         FLARE_CX_FORMATS, FLARE_CX_MODELS, FLARE_LINK_SPEEDS, FLARE_RESOLUTION } from './constants';
import { calculateFrameRate } from './utils/flare-frame-rate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/flare-resolution';
import './FlareCalculator.css';

class FlareCalculator extends Component {
    state = {
        link: FLARE_LINK.CL,                    // Link type (Camera Link or CoaXPress)
        model: FLARE_CL_MODEL.Type2M360MCL,     // Camera model
        models: FLARE_CL_MODELS,                // Current models (changes based on link)
        hwversion: 1,                           // Hardware version
        format: FLARE_CL_FORMAT.Output2x8,      // Link format (Camera Link)
        clFormats: FLARE_CL_FORMATS.CL2_4m,     // Current formats (changes based on model)
        cxFormats: FLARE_CX_FORMATS.CX2_4m,     // Current formats (changes based on model)
        bitDepth: 8,                            // Bit-depth (CoaXPress)
        linkCount: 1,                           // Link count (CoaXPress)
        linkSpeed: FLARE_LINK_SPEEDS.CXP3,      // Link speed (CoaXPress)
        resolutionPreset: FLARE_RESOLUTION.MAXIMUM,     // Resolution preset
        width: 2048,                            // Resolution - width
        height: 1088,                           // Resolution - height
        subSampling: false,                     // Sub-sampling enabled
        slowMode: false,                        // Slow-mode enabled
        frameRate: '70.95 FPS [2048 x 1088]'    // Maximum frame-rate
    };

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        let { name, value, checked } = e.target;
        if (!isNaN(value)) value = Number(value);
        if (checked !== undefined) value = checked;
        this.setState(() => ({ [name]: value }));

        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Reset model options and hardware version
    handleChangeLink = (e) => {
        const link = e.target.value;
        const models = (link === FLARE_LINK.CL) ? FLARE_CL_MODELS : FLARE_CX_MODELS;
        const firstModel = models[0];
        this.setState(() => ({ link: link, model: firstModel, models: models, hwversion: 1 }));
        
        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Update default hardware version
    handleChangeModel = (e) => {
        const model = e.target.value;
        
        // Get new version
        const isCL = this.state.link === FLARE_LINK.CL;
        const isVersion2 = isCL && model.startsWith('12M');
        const hwversion = isVersion2 ? 2 : 1;
        
        // Get and set new formats
        if (isCL) {
            const clFormats = model.startsWith('12M') ? FLARE_CL_FORMATS.CL12m : FLARE_CL_FORMATS.CL2_4m;
            this.setState(() => ({ model: model, hwversion: hwversion, clFormats: clFormats }));
        } else {
            let cxFormats;
            if (model.startsWith('48M')) {
                cxFormats = FLARE_CX_FORMATS.CX48m;
            } else if (model.startsWith('12M')) {
                cxFormats = FLARE_CX_FORMATS.CX12m;
            } else {
                cxFormats = FLARE_CX_FORMATS.CX2_4m;
            }
            this.setState(() => ({ model: model, hwversion: hwversion, cxFormats: cxFormats }));
        }
        
        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Change resolution preset
    handleChangePreset = (e) => {
        const preset = e.target.value;
        if (preset === FLARE_RESOLUTION.CUSTOM) {
            this.setState(() => ({ resolutionPreset: preset }));
        } else if (preset === FLARE_RESOLUTION.MINIMUM || preset === FLARE_RESOLUTION.MAXIMUM) {
            this.setState(() => ({ resolutionPreset: preset }));
            this.updateMinMaxResolution();
        } else {
            let [ width, height ] = preset.split('x');
            this.setState(() => ({ resolutionPreset: preset, width: Number(width), height: Number(height) }));
        }

        this.updateFrameRate();
    }

    // Change resolution and set preset to 'Custom'
    handleChangeResolution = (e) => {
        console.log(e.target.value);
        let { name, value } = e.target;
        console.log(name);
        console.log(value);
        this.setState(() => ({ resolutionPreset: FLARE_RESOLUTION.CUSTOM, [name]: Number(value) }));

        this.updateFrameRate();
    }

    // Update minimum/maximum resolution
    updateMinMaxResolution = () => {
        this.setState((prevState) => {
            const resolutionPreset = prevState.resolutionPreset;
            if (resolutionPreset === FLARE_RESOLUTION.MINIMUM) {
                return {
                    width: minWidth(prevState.link, prevState.model, prevState.format),
                    height: minHeight(prevState.model, prevState.format)
                };
            } else if (resolutionPreset === FLARE_RESOLUTION.MAXIMUM) {
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

    renderFormatComponent = () => {
        const isCL = this.state.link === FLARE_LINK.CL;
        return isCL ?
        <FlareCLFormat
            clFormats={this.state.clFormats}
            handleChange={this.handleChange}
        /> :
        <FlareCXFormat
            cxFormats={this.state.cxFormats}
            handleChange={this.handleChange}
        />;
    }

    render = () => (
        <div className="flare-calculator">
            <div>
                <div className='flare-calculator-title'>Flare Frame Rate Calculator</div>
                <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
            </div>
            <FlareModel
                models={this.state.models}
                handleChangeLink={this.handleChangeLink}
                handleChangeModel={this.handleChangeModel}
            />
            <FlareHardwareVersion
                link={this.state.link}
                model={this.state.model}
                hwversion={this.state.hwversion}
                handleChange={this.handleChange}
            />
            {this.renderFormatComponent()}
            <FlareResolution
                resolutionPreset={this.state.resolutionPreset}
                width={this.state.width}
                height={this.state.height}
                handleChangePreset={this.handleChangePreset}
                handleChangeResolution={this.handleChangeResolution}
            />
            <FlareOptions
                link={this.state.link}
                model={this.state.model}
                format={this.state.format}
                handleChange={this.handleChange}
            />
            <FlareFrameRate
                frameRate={this.state.frameRate}
            />
        </div>
    );
}

export default FlareCalculator;
