import React, { Component } from 'react';
import Model from './Model';
import HardwareVersion from './HardwareVersion';
import Format from './Format';
import Resolution from './Resolution';
import Options from './Options';
import FrameRate from './FrameRate';
import { calculateFrameRate } from '../utils/calculate-frame-rate';
import './calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: 'cl',                                     // Link type (Camera Link or CoaXPress)
            model: '2M360MCL/NCL',                          // Camera model
            hwversion: 2,                                   // Hardware version
            format: 'Base 8-bit x 2',                       // Camera link format
            bitDepth: 8, linkCount: 1, linkSpeed: 'CXP-3',  // CoaXpress format
            width: 1920,                                    // Resolution - width
            height: 1080,                                   // Resolution - height
            subSampling: false,                             // Sub-sampling enabled
            slowMode: false,                                // Slow-mode enabled
            frameRate: 0                                    // Maximum frame-rate
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(newState) {
        // Recalculate frame-rate
        newState.frameRate = calculateFrameRate(this.state);
        this.setState(newState);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="Calculator">
                <Model link={this.state.link} hwversion={this.state.hwversion} updateState={this.updateState}/>
                <HardwareVersion hwversion={this.state.hwversion} updateState={this.updateState}/>
                <Format link={this.state.link} model={this.state.model} updateState={this.updateState}/>
                <Resolution updateState={this.updateState} width={this.state.width} height={this.state.height}/>
                <Options link={this.state.link} model={this.state.model} format={this.state.format} updateState={this.updateState}/>
                <FrameRate frameRate={this.state.frameRate} updateState={this.updateState}/>
            </div>
        );
    }
}

export default Calculator;
