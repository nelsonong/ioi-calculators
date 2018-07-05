import React, { Component } from 'react';
import uuid from 'uuid';
import { DVRCamera, DVRCameras, DVRConfiguration, DVRDrives, DVRModel, DVRRecordingTime } from './components';
import { DVR_CONFIG, DVR_LINK, DVR_MODEL, DVR_MODES, DVR_CL_CONFIGS, DVR_CLPLUS_CONFIGS, DVR_CX_CONFIGS, DVR_CXPLUS_CONFIGS, DVR_DRIVE_CAPACITY } from './constants';
import './DVRCalculator.css';

class DVRCalculator extends Component {
    state = {
        model: DVR_MODEL.CORE2CL,
        link: DVR_LINK.CL,
        configuration: DVR_CONFIG.CL.BASEx4,
        configurations: DVR_CL_CONFIGS,
        cameras: [],
        dataRates: [],
        totalDataRate: 0,
        capacity: 892,
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

    handleChangeDrive = (e) => {
        const drive = e.target.value;
        const capacity = DVR_DRIVE_CAPACITY[drive];
        this.setState(() => ({ capacity }));

        this.updateRecordingTime();
    }

    reloadCameras = () => {
        this.setState((prevState) => {
            const modes = DVR_MODES[prevState.configuration];
            const cameras = modes.map(mode => {
                const key = uuid();
                return ({
                    id: key,
                    camera: <DVRCamera
                        key={key}
                        id={key}
                        pushDataRate={this.pushDataRate}
                        deleteDataRate={this.deleteDataRate}
                        link={prevState.link}
                        mode={mode}
                    />
                });
            });
            return { cameras };
        });
    }
        
    // Push/replace existing data rate
    pushDataRate = (id, newDataRate) => {
        let dataRates = this.state.dataRates.filter(dataRate => dataRate.id !== id);
        dataRates.push({ id, value: newDataRate });
        this.updateTotalDataRate(dataRates);
    }

    // Delete existing data rate
    deleteDataRate = (id) => {
        const dataRates = this.state.dataRates.filter(dataRate => dataRate.id !== id);
        this.updateTotalDataRate(dataRates);
    }

    // Recalculate total data rate with updated data
    updateTotalDataRate = (dataRates) => {
        let totalDataRate = 0;
        for (let dataRate of dataRates) {
            totalDataRate += dataRate.value;
        }

        this.setState(() => ({ dataRates, totalDataRate }));
        this.updateRecordingTime();
    }

    // Update recording time after setting state
    updateRecordingTime = () => {
        this.setState((prevState) => {
            const seconds = prevState.capacity / prevState.totalDataRate;
            const recordingTime = isFinite(seconds) ? this.secondsTohhmmss(seconds) : 'N/A';
            return ({ recordingTime });
        });
    }

    secondsTohhmmss = (totalSeconds) => {
        let hours   = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
        
        // round seconds
        seconds = Math.round(seconds);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds  < 10) ? "0" + seconds : seconds;

        let result = `${hours}h ${minutes}m ${seconds}s`;
        return result;
    }

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
                handleChangeDrive={this.handleChangeDrive}
            />
            <DVRRecordingTime
                recordingTime={this.state.recordingTime}
            />
        </div>
    );
}

export default DVRCalculator;
