import React, { Component } from 'react';

class HardwareVersion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.updateState({ hwversion: e.target.value });
    }

    render() {
        return (
            <fieldset>
            <legend>Hardware Version</legend>
                <input type='radio' value='1' checked={this.props.hwversion === '1'} onChange={this.handleChange} />1&nbsp;
                <input type='radio' value='2' checked={this.props.hwversion === '2'} onChange={this.handleChange} />2
            </fieldset>
        );
    }
}

export default HardwareVersion;