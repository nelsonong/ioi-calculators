import React, { Component } from 'react';

class Options extends Component {
    render() {
        return (
            <fieldset>
            <legend>Options</legend>
                <input type="checkbox" name="hv" value="1" />Enable sub-sampling
                <br />
                <input type="checkbox" name="hv" value="2" />Enabled reduced line rate mode
            </fieldset>
        );
    }
}

export default Options;