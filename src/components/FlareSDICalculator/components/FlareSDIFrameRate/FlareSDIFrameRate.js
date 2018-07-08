import React from 'react';
import './FlareSDIFrameRate.css';

const FlareSDIFrameRate = ({ frameRate, frameRates, handleChange }) => {
    const frameRateOptions = frameRates.map((frameRate, i) => <option key={i} value={frameRate}>{frameRate}</option>);
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <select name='frameRate' value={frameRate} onChange={handleChange}>
                {frameRateOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIFrameRate;