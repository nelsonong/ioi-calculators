import React, { Component } from 'react';

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supportedFormats: [ 'Full 8-bit x 8', '80-bit 10-bit x 8' ]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    subSamplingDisabled() {
        const currentModel = this.props.model;
        return (currentModel.startsWith('12M') || currentModel.startsWith('48M'));
    }

    slowModeDisabled() {
        const link = this.props.link;
        const model = this.props.model;
        const format = this.props.format;

        return (link !== 'cl' || model.startsWith('12M') || !this.state.supportedFormats.includes(format));
    }

    handleInputChange(e) {
        const name = e.target.name;
        const checked = e.target.checked;

        this.props.updateState({ [name]: checked });
    }

    render() {
        return (
            <fieldset>
            <legend>Options</legend>
                <input type="checkbox" name='subSampling' disabled={this.subSamplingDisabled()} onChange={this.handleInputChange}/>Enable sub-sampling
                <br />
                <input type="checkbox" name='slowMode' disabled={this.slowModeDisabled()} onChange={this.handleInputChange}/>Enabled reduced line rate mode
            </fieldset>
        );
    }
}

export default Options;