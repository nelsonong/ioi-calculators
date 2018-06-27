import React, { Component } from 'react';
import { BIT_DEPTHS } from '../../constants/victorem';

class Format extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // -------------- Change Handlers --------------
    handleInputChange(e) {
        const name = e.target.name;
        const value = (name === 'bitDepth') ? Number(e.target.value) : e.target.value;
        
        this.props.updateState({ [name]: value });
    }

    renderFormats() {
        return this.props.formats.map((format, i) => {
            return <option key={i}>{format}</option>
        });
    }

    renderBitDepths() {
        return BIT_DEPTHS.map((bitDepth, i) => {
            return <option key={i} value={bitDepth}>{bitDepth}</option>;
        });
    }

    render() {
        return (
            <fieldset>
            <legend>Output Format</legend>
                Link:&nbsp;
                <select name='format' onChange={this.handleInputChange}>
                    {this.renderFormats()}
                </select>&nbsp;
                Bit Depth:&nbsp;
                <select name='bitDepth' onChange={this.handleInputChange}>
                    {this.renderBitDepths()}
                </select>
            </fieldset>
        );
    }
}

export default Format;