import React, { Component } from 'react';
import { Model, ModelInfo, Format, Resolution, Options, FrameRate } from '../components/Victorem';
import { LINK, CL_MODEL, CL_FORMAT, LINK_SPEEDS } from '../constants/flare';
import { calculateFrameRate } from '../utils/frame-rate';
import './VictoremCalculator.css';

class VictoremCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: LINK.CL,                                  // Link type (Camera Link or CoaXPress)
            model: CL_MODEL.Type2M360MCL,                   // Camera model
            format: CL_FORMAT.Output2x8,                    // Camera link format
            bitDepth: 8, linkCount: 1, linkSpeed: LINK_SPEEDS.CXP3,  // CoaXpress format
            width: 1920,                                    // Resolution - width
            height: 1080,                                   // Resolution - height
            subSampling: false,                             // Sub-sampling enabled
            slowMode: false,                                // Slow-mode enabled
            frameRate: 'N/A'                                // Maximum frame-rate
        };

        // Initialize framerate
        this.state.frameRate = calculateFrameRate(this.state);

        this.updateState = this.updateState.bind(this);
    }

    // Update state and recalculate frame-rate
    updateState(newState) {
        this.setState(newState, () => {
            this.setState({ frameRate: calculateFrameRate(this.state) });
        });
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="VictoremCalculator">
                <div className='TopBar'>
                    <div className='VictoremTitle'>Victorem Frame Rate Calculator</div>
                    <button className='CloseCalculator' type='button' onClick={() => this.props.deleteCalculator(this.props.id)}>✖</button>
                </div>
                <Model link={this.state.link} updateState={this.updateState} />
                <ModelInfo />
                <Format link={this.state.link} model={this.state.model} updateState={this.updateState} />
                <Resolution link={this.state.link} model={this.state.model} format={this.state.format} width={this.state.width} height={this.state.height} updateState={this.updateState} />
                <Options link={this.state.link} model={this.state.model} format={this.state.format} updateState={this.updateState} />
                <FrameRate frameRate={this.state.frameRate} />
            </div>
        );
    }
}

export default VictoremCalculator;
