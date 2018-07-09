import React, { Component } from 'react';
import CalculatorTopBar from '../CalculatorTopBar';
import { DVRCamera, DVRCameras, DVRDrives, DVRModelConfiguration, DVRRecordingTime } from './components';
import { CONFIG, LINK, MODEL, MODES, CL_CONFIGS, CLPLUS_CONFIGS, CX_CONFIGS, CXPLUS_CONFIGS, SDI_CONFIGS, DRIVE_CAPACITY } from './constants';
import uuid from 'uuid';
import styles from './DVRCalculator.css';

class DVRCalculator extends Component {
    state = {
        model: MODEL.CORE2CL,
        link: LINK.CL,
        configuration: CONFIG.CL.BASEx4,
        configurations: CL_CONFIGS,
        cameras: [],
        dataRates: [],
        totalDataRate: 0,
        driveCapacity: 223.6,
        driveAmount: 1,
        totalCapacity: 223.6,
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
            case MODEL.CORE2CL:
                configurations = CL_CONFIGS;
                link = LINK.CL;
                break;
            case MODEL.CORE2CLPLUS:
                configurations = CLPLUS_CONFIGS;
                link = LINK.CL;
                break;
            case MODEL.CORE2CX:
                configurations = CX_CONFIGS;
                link = LINK.CX;
                break;
            case MODEL.CORE2CXPLUS:
                configurations = CXPLUS_CONFIGS;
                link = LINK.CX;
                break;
            case MODEL.CORE2SDI:
                configurations = SDI_CONFIGS;
                link = LINK.SDI;
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
        const driveCapacity = DRIVE_CAPACITY[drive];
        const totalCapacity = driveCapacity * this.state.driveAmount;
        this.setState(() => ({ driveCapacity, totalCapacity }));

        this.updateRecordingTime();
    }

    handleChangeDriveAmount = (e) => {
        const driveAmount = Number(e.target.value);
        const totalCapacity = driveAmount * this.state.driveCapacity;
        this.setState(() => ({ driveAmount, totalCapacity }));

        this.updateRecordingTime();
    }

    reloadCameras = () => {
        this.setState(({ link, configuration }) => {
            const modes = MODES[configuration];
            const cameras = modes.map(mode => {
                const key = uuid();
                return ({
                    id: key,
                    camera: <DVRCamera
                        key={key}
                        id={key}
                        pushDataRate={this.pushDataRate}
                        deleteDataRate={this.deleteDataRate}
                        link={link}
                        mode={mode}
                    />
                });
            });
            return { cameras, dataRates: [], totalDataRate: 0 };
        });
        
        this.updateRecordingTime();
    }
        
    // Push/replace existing data rate
    pushDataRate = (id, dataRate) => {
        let dataRates = this.state.dataRates.filter(dataRate => dataRate.id !== id);
        dataRates.push({ id, value: dataRate });
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
        this.setState(({ totalCapacity, totalDataRate }) => {
            const seconds = totalCapacity / totalDataRate * 1024;   // Convert to MB/s
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
        <div className={styles.root}>
            <CalculatorTopBar
                inModal={false}
                type={'DVR Storage'}
                deleteCalculator={this.props.deleteCalculator}
                id={this.props.id}
            />
            <DVRModelConfiguration
                configurations={this.state.configurations}
                handleChangeModel={this.handleChangeModel}
                handleChangeConfiguration={this.handleChangeConfiguration}
            />
            <DVRCameras
                cameras={this.state.cameras}
            />
            <DVRDrives
                totalCapacity={this.state.totalCapacity}
                handleChangeDriveAmount={this.handleChangeDriveAmount}
                handleChangeDrive={this.handleChangeDrive}
            />
            <DVRRecordingTime
                recordingTime={this.state.recordingTime}
            />
        </div>
    );
}

export default DVRCalculator;
