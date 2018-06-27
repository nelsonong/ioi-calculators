import React, { Component } from 'react';
import { BIT_DEPTHS } from '../../constants';
import './Format.css';

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
                <div className='format-label'>Link:</div>
                <select className='format-select' name='format' onChange={this.handleInputChange}>
                    {this.renderFormats()}
                </select>

                <div className='format-label'>Bit Depth:</div>
                <select className='format-select' name='bitDepth' onChange={this.handleInputChange}>
                    {this.renderBitDepths()}
                </select>
            </fieldset>
        );
    }
}

export default Format;