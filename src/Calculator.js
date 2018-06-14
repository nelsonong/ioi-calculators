import React, { Component } from 'react';
import './calculator.css';

class Calculator extends Component {
    render() {
        return (
            <div className="Calculator">
                <fieldset>
                <legend>Model</legend>
                    <select>
                        <option value="cl">Camera Link</option>
                        <option value="cx">CoaXPress</option>
                    </select>
                    <br />
                    <select>
                        <option value="cl">2M360MCL/NCL</option>
                    </select>
                </fieldset>
                <fieldset>
                <legend>Hardware Version</legend>
                    <input type="radio" name="hv" value="1" />1
                    <input type="radio" name="hv" value="2" />2
                </fieldset>
                <fieldset>
                <legend>Camera Link Format</legend>
                    <select>
                        <option value="b8b2">Base 8-bit x 2</option>
                    </select>
                </fieldset>
                <fieldset>
                <legend>Resolution</legend>
                    <span>Presets:</span>&nbsp;&nbsp;
                    <select>
                        <option value="b8b2">FHD (1920x1080)</option>
                    </select>
                    <br />
                    <span>W x H:</span>&nbsp;&nbsp;
                    <input type="number" min="10" max="20" required />&nbsp;&nbsp;
                    <input type="number" min="10" max="20" required />
                </fieldset>
                <fieldset>
                <legend>Options</legend>
                    <input type="checkbox" name="hv" value="1" />Enable sub-sampling
                    <br />
                    <input type="checkbox" name="hv" value="2" />Enabled reduced line rate mode
                </fieldset>
                <fieldset>
                <legend>Capabilities</legend>
                    <span>Frame rate:</span>&nbsp;&nbsp;<input type="text" name="framerate" />
                    <br/><br/>
                    <label htmlFor="resolution">Resolution:</label>
                    <input type="text" name="resolution" />
                </fieldset>
            </div>
        );
    }
}

export default Calculator;
