import React, { Component } from 'react';
import { DVRCameras, DVRConfiguration, DVRDrives, DVRModel, DVRRecordingTime } from './components';
import './DVRCalculator.css';

class DVRCalculator extends Component {
    state = {
        model: '',
        configuration: '',
        configurationOptions: [],
        cameras: [],
        dataRate: 5,
        capacity: 100,
        recordingTime: 'N/A'
    };

    updateState = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.refreshRecordingTime();
        });
    }

    reloadConfigurationOptions = () => {

    }

    updateCameras = () => {

    }

    calculateRecordingTime = () => {
        this.setState({ recordingTime: this.state.capacity / this.state.dataRate });
    }

    render = () => {
        return (
            <div className="dvr-calculator">
                <div>
                    <div className='dvr-calculator-title'>DVR Storage Calculator</div>
                    <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
                </div>
                <DVRModel
                    updateState={this.updateState}
                />
                <DVRConfiguration
                    configurationOptions={this.state.configurationOptions}
                    updateState={this.updateState}
                />
                <DVRCameras
                    updateCameras={this.updateCameras}
                    updateState={this.updateState}
                />
                <DVRDrives
                    updateState={this.updateState}
                />
                <DVRRecordingTime
                    recordingTime={this.state.recordingTime}
                />
            </div>
        );
    }
}

export default DVRCalculator;
