import React, { Component } from 'react';

class Capabilities extends Component {
    render() {
        return (
            <fieldset>
            <legend>Capabilities</legend>
                <span>Frame rate:</span>&nbsp;&nbsp;<input type="text" name="framerate" />
                <br/><br/>
                <label htmlFor="resolution">Resolution:</label>
                <input type="text" name="resolution" />
            </fieldset>
        );
    }
}

export default Capabilities;