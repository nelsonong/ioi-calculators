import React, { Component } from 'react';

class Resolution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [ [3840, 2160], [2048, 1024], [1920, 1080], [1280, 1024], [1280, 720], [1024, 1024], [1024, 768], [800, 600], [640, 480], [320, 240] ]
        };

        this.handleChangePreset = this.handleChangePreset.bind(this);
    }

    loadPresets() {
        return this.state.presets.map((preset, i) => {
            let presetString = preset[0] + 'x' + preset[1];
            return <option key={i} value={presetString}>{presetString}</option>;
        });
    }

    handleChangePreset(e) {

    }

    render() {
        return (
            <fieldset>
            <legend>Resolution</legend>
                <span>Presets:</span>&nbsp;&nbsp;
                <select onChange={this.handleChangePreset}>
                    {this.loadPresets()}
                </select>
                <br />
                <span>W x H:</span>&nbsp;&nbsp;
                <input type="number" min="1" max="9999" required />&nbsp;&nbsp;
                <input type="number" min="1" max="9999" required />
            </fieldset>
        );
    }
}

export default Resolution;