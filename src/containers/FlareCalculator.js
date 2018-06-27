import React, { Component } from 'react';
import { Model, HardwareVersion, Format, Resolution, Options, FrameRate } from '../components/Flare';
import { LINK, CL_MODEL, CL_FORMAT, LINK_SPEEDS } from '../constants/flare';
import { calculateFrameRate } from '../utils/flare/frame-rate';
import './FlareCalculator.css';

class FlareCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: LINK.CL,                                  // Link type (Camera Link or CoaXPress)
            model: CL_MODEL.Type2M360MCL,                   // Camera model
            hwversion: 1,                                   // Hardware version
            format: CL_FORMAT.Output2x8,                    // Camera link format
            bitDepth: 8, linkCount: 1, linkSpeed: LINK_SPEEDS.CXP3,  // CoaXpress format
            width: 1920,                                    // Resolution - width
            height: 1080,                                   // Resolution - height
            subSampling: false,                             // Sub-sampling enabled
            slowMode: false,                                // Slow-mode enabled
            frameRate: 'N/A'                                // Maximum frame-rate
        };

        // Initialize framerate
        this.state.frameRate = calculateFrameRate({...this.state});

        this.updateState = this.updateState.bind(this);
    }

    // Update state and recalculate frame-rate
    updateState(newState) {
        this.setState(newState, () => {
            this.setState({ frameRate: calculateFrameRate({...this.state}) });
        });
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="FlareCalculator">
                <div className='TopBar'>
                    <div className='FlareTitle'>Flare Frame Rate Calculator</div>
                    <button className='CloseFlare' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
                </div>
                <Model link={this.state.link} hwversion={this.state.hwversion} updateState={this.updateState} />
                <HardwareVersion link={this.state.link} model={this.state.model} hwversion={this.state.hwversion} updateState={this.updateState} />
                <Format link={this.state.link} model={this.state.model} updateState={this.updateState} />
                <Resolution {...this.state} updateState={this.updateState} />
                <Options link={this.state.link} model={this.state.model} format={this.state.format} updateState={this.updateState} />
                <FrameRate frameRate={this.state.frameRate} />
            </div>
        );
    }
}

export default FlareCalculator;
