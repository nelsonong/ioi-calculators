import React, { Component } from 'react';
import { DVRCameras, DVRConfiguration, DVRDrives, DVRModel, DVRRecordingTime } from './components';
import FlareCalculator from '../FlareCalculator';
import { DVR_CONFIG, DVR_LINK, DVR_MODEL, DVR_MODES, DVR_CL_CONFIGS, DVR_CLPLUS_CONFIGS, DVR_CX_CONFIGS, DVR_CXPLUS_CONFIGS } from './constants';
import './DVRCalculator.css';

class DVRCalculator extends Component {
    state = {
        model: DVR_MODEL.CORE2CL,
        link: DVR_LINK.CL,
        configuration: DVR_CONFIG.CL.BASEx4,
        configurations: DVR_CL_CONFIGS,
        cameras: [],
        dataRate: 5,
        capacity: 100,
        recordingTime: 'N/A'
    };

    // Init cameras
    componentDidMount = () => this.reloadCameras();

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value)) value = Number(value);
        this.setState(() => ({ [name]: value }));

        this.updateRecordingTime();
    }

    handleChangeModel = (e) => {
        const model = e.target.value;

        // Get link and configuration
        let link;
        let configurations;
        switch (model) {
            case DVR_MODEL.CORE2CL:
                configurations = DVR_CL_CONFIGS;
                link = DVR_LINK.CL;
                break;
            case DVR_MODEL.CORE2CLPLUS:
                configurations = DVR_CLPLUS_CONFIGS;
                link = DVR_LINK.CL;
                break;
            case DVR_MODEL.CORE2CX:
                configurations = DVR_CX_CONFIGS;
                link = DVR_LINK.CX;
                break;
            case DVR_MODEL.CORE2CXPLUS:
                configurations = DVR_CXPLUS_CONFIGS;
                link = DVR_LINK.CX;
                break;
        }
        this.setState(() => ({ model, link, configurations }));
        this.reloadCameras();
    }

    handleChangeConfiguration = (e) => {
        this.handleChange(e);
        this.reloadCameras();
    }

    reloadCameras = () => {
        this.setState((prevState) => {
            const modes = DVR_MODES[prevState.configuration];
            console.log(modes);
            const cameras = modes.map(mode => {
                const key = this.unique_id();
                return ({
                    id: key,
                    camera: <FlareCalculator key={key} id={key} deleteCalculator={this.deleteCamera} link={prevState.link} mode={mode} />
                });
            });
            return { cameras };
        });
    }

    // Update recording time after setting state
    updateRecordingTime = () => {
        this.setState((prevState) => ({ recordingTime: this.state.capacity / this.state.dataRate }));
    }

    // Remove calculator
    deleteCamera = (id) => {
        const cameras = this.state.cameras;
        const newCameras = cameras.filter(camera => camera.id !== id);
        this.setState(() => ({ cameras: newCameras }));
    }

    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    unique_id = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render = () => (
        <div className="dvr-calculator">
            <div>
                <div className='dvr-calculator-title'>DVR Storage Calculator</div>
                <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
            </div>
            <DVRModel
                handleChangeModel={this.handleChangeModel}
            />
            <DVRConfiguration
                configurations={this.state.configurations}
                handleChangeConfiguration={this.handleChangeConfiguration}
            />
            <DVRCameras
                cameras={this.state.cameras}
            />
            <DVRDrives
            handleChange={this.handleChange}
            />
            <DVRRecordingTime
                recordingTime={this.state.recordingTime}
            />
        </div>
    );
}

export default DVRCalculator;
