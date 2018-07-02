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

    // General change handler (requires input element to have name attribute)
    handleChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value)) value = Number(value);
        this.setState(() => ({ [name]: value }));

        this.updateRecordingTime();
    }

    reloadConfigurationOptions = () => {

    }

    updateCameras = () => {

    }

    // Update recording time after setting state
    updateRecordingTime = () => {
        this.setState((prevState) => ({ recordingTime: this.state.capacity / this.state.dataRate }));
    }

    render = () => (
        <div className="dvr-calculator">
            <div>
                <div className='dvr-calculator-title'>DVR Storage Calculator</div>
                <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
            </div>
            <DVRModel
                handleChange={this.handleChange}
            />
            <DVRConfiguration
                configurationOptions={this.state.configurationOptions}
                handleChange={this.handleChange}
            />
            <DVRCameras
                updateCameras={this.updateCameras}
                handleChange={this.handleChange}
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
