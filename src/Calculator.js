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
            hwversion: '2',                                   // Hardware version
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
                <HardwareVersion updateState={this.updateState}/>
                <Format link={this.state.link} model={this.state.model} updateState={this.updateState}/>
                <Resolution updateState={this.updateState} width={this.state.width} height={this.state.height}/>
                <Options updateState={this.updateState}/>
                <Capabilities updateState={this.updateState}/>
            </div>
        );
    }
}

export default Calculator;
