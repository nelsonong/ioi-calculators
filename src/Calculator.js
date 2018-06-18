import React, { Component } from 'react';
import Model from './Model';
import HardwareVersion from './HardwareVersion';
import Format from './Format';
import Resolution from './Resolution';
import Options from './Options';
import Capabilities from './Capabilities';
import './calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: 'cl',                                     // Link type (Camera Link, CoaXPress)
            model: '2M360MCL/NCL',                          // Camera model
            hwversion: 2,                                   // Hardware version
            format: 'Base 8-bit x 2',                       // Camera link format
            bitDepth: 8, linkCount: 1, linkSpeed: 'CXP-3',  // CoaXpress format
            width: 1920,                                    // Resolution - width
            height: 1080                                    // Resolution - height
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(newState) {
        this.setState(newState);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="Calculator">
                <Model updateLink={this.updateLink} updateState={this.updateState}/>
                <HardwareVersion updateHWVersion={this.updateHWVersion}/>
                <Format link={this.state.link} model={this.state.model} updateFormat={this.updateFormat}/>
                <Resolution />
                <Options />
                <Capabilities />
            </div>
        );
    }
}

export default Calculator;
