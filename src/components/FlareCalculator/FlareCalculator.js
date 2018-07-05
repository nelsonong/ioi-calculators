import React, { Component } from 'react';
import { FlareFormat, FlareHardwareVersion, FlareFrameRate, FlareOptions, FlareModel, FlareResolution, FlareTitle } from './components';
import { FLARE_LINK, FLARE_CL_FORMAT, FLARE_CL_FORMATS, FLARE_CL_MODEL, FLARE_CL_MODELS,
         FLARE_CX_FORMATS, FLARE_CX_MODELS, FLARE_LINK_SPEEDS, FLARE_MODE, FLARE_RESOLUTION, FLARE_SDI_MODELS } from './constants';
import { calculateFrameRate } from './utils/flare-frame-rate';
import { minWidth, maxWidth, minHeight, maxHeight } from './utils/flare-resolution';
import './FlareCalculator.css';

class FlareCalculator extends Component {
    state = {
        link: this.props.link,                  // Link type (Camera Link or CoaXPress)
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
        frameRate: 70.95,                       // Maximum frame-rate
        mode: this.props.mode                   // Mode (Base or Full if in DVR calculator)
    };

    componentDidMount() {
        const { link, mode } = this.props;
        if (link && mode) {
            this.initDVRMode(link, mode);
        }
    }
    
    // Init if in DVR calculator
    initDVRMode = (link, mode) => {
        let models = (link === FLARE_LINK.CL) ? FLARE_CL_MODELS : FLARE_CX_MODELS;
        let model = models[0];

        if (mode === FLARE_MODE.DUAL_FULL && link === FLARE_LINK.CL) {
            model = FLARE_CL_MODEL.Type12M125MCL;
            models = models.filter(model => model.startsWith('12M'));
        }

        this.setState(() => ({ link, model, models, hwversion: 1 }));

        this.updateFormat();
        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

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
        let models;
        switch (link) {
            case FLARE_LINK.CL:
                models = FLARE_CL_MODELS;
                break;
            case FLARE_LINK.CX:
                models= FLARE_CX_MODELS;
                break;
            case FLARE_LINK.SDI:
                models = FLARE_SDI_MODELS;
        }

        const model = models[0];    // First model
        this.setState(() => ({ link, model, models, hwversion: 1 }));
        
        this.updateFormat();
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
        this.setState(() => ({ model, hwversion }));

        this.updateFormat();
        this.updateMinMaxResolution();
        this.updateFrameRate();
    }

    // Update format when link or model changes
    updateFormat = () => {
        this.setState((prevState) => {
            const isCL = prevState.link === FLARE_LINK.CL;

            // Get and set new formats
            if (isCL) {
                let clFormats = prevState.model.startsWith('12M') ? FLARE_CL_FORMATS.CL12m : FLARE_CL_FORMATS.CL2_4m;
                const mode = prevState.mode;
                if (mode) {
                    switch (mode) {
                    case FLARE_MODE.BASE:
                        clFormats = clFormats.filter(clFormat => clFormat.startsWith('Base'));
                        break;
                    case FLARE_MODE.FULL:
                        clFormats = clFormats.filter(clFormat => !clFormat.startsWith('Base'));
                        break;
                    case FLARE_MODE.DUAL_FULL:
                        clFormats = clFormats.filter(clFormat => (clFormat.startsWith('80') || clFormat.startsWith('Dual')));
                        break;
                    }
                }
                return ({ clFormats });
            } else {
                let cxFormats;
                const model = prevState.model;
                if (model.startsWith('48M')) {
                    cxFormats = FLARE_CX_FORMATS.CX48m;
                } else if (model.startsWith('12M')) {
                    cxFormats = FLARE_CX_FORMATS.CX12m;
                } else {
                    cxFormats = FLARE_CX_FORMATS.CX2_4m;
                }
                return ({ cxFormats });
            }
        });
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
        let { name, value } = e.target;
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

    render = () => (
        <div className="flare-calculator">
            <FlareTitle
                mode={this.state.mode}
            />
            <FlareModel
                link={this.state.link}
                models={this.state.models}
                mode={this.state.mode}
                handleChangeLink={this.handleChangeLink}
                handleChangeModel={this.handleChangeModel}
            />
            <FlareHardwareVersion
                link={this.state.link}
                model={this.state.model}
                hwversion={this.state.hwversion}
                handleChange={this.handleChange}
            />
            <FlareFormat
                link={this.state.link}
                clFormats={this.state.clFormats}
                cxFormats={this.state.cxFormats}
                mode={this.state.mode}
                handleChange={this.handleChange}
            />
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
                width={this.state.width}
                height={this.state.height}
            />
        </div>
    );
}

FlareCalculator.defaultProps = {
    link: FLARE_LINK.CL,
    mode: false
}

export default FlareCalculator;
