import React, { Component } from 'react';
import { FlareModel, FlareHardwareVersion, FlareFormat, FlareResolution, FlareOptions, FlareFrameRate } from './components';
import { LINK, CL_MODEL, CL_FORMAT, LINK_SPEEDS } from './constants';
import { calculateFrameRate } from './utils/flare-frame-rate';
import './FlareCalculator.css';

class FlareCalculator extends Component {
    state = {
        link: LINK.CL,                                  // Link type (Camera Link or CoaXPress)
        model: CL_MODEL.Type2M360MCL,                   // Camera model
        hwversion: 1,                                   // Hardware version
        format: CL_FORMAT.Output2x8,                    // Camera link format
        bitDepth: 8, linkCount: 1, linkSpeed: LINK_SPEEDS.CXP3,  // CoaXpress format
        width: 2048,                                    // Resolution - width
        height: 1088,                                   // Resolution - height
        subSampling: false,                             // Sub-sampling enabled
        slowMode: false,                                // Slow-mode enabled
        frameRate: 'N/A'                                // Maximum frame-rate
    };

    // Update state and recalculate frame-rate
    updateState = (newState) => {
        this.setState(newState, () => {
            this.setState({ frameRate: calculateFrameRate({...this.state}) });
        });
    }

    render = () => {
        return (
            <div className="flare-calculator">
                <div>
                    <div className='flare-calculator-title'>Flare Frame Rate Calculator</div>
                    <button className='close-calculator-button' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
                </div>
                <FlareModel link={this.state.link} hwversion={this.state.hwversion} updateState={this.updateState} />
                <FlareHardwareVersion link={this.state.link} model={this.state.model} hwversion={this.state.hwversion} updateState={this.updateState} />
                <FlareFormat link={this.state.link} model={this.state.model} updateState={this.updateState} />
                <FlareResolution {...this.state} updateState={this.updateState} />
                <FlareOptions link={this.state.link} model={this.state.model} format={this.state.format} updateState={this.updateState} />
                <FlareFrameRate frameRate={this.state.frameRate} />
            </div>
        );
    }
}

export default FlareCalculator;
