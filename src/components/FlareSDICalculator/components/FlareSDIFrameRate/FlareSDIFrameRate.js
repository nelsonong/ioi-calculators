import React from 'react';
import './FlareSDIFrameRate.css';

const FlareSDIFrameRate = ({ frameRate, frameRates, dataRate, handleChange }) => {
    const frameRateOptions = frameRates.map((frameRate, i) => <option key={i} value={frameRate}>{frameRate}</option>);
    const frameRateInput = `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <div>
            <fieldset>
            <legend>Frame Rate</legend>
                <select name='frameRate' value={frameRate} onChange={handleChange}>
                    {frameRateOptions}
                </select>
            </fieldset>
            <fieldset>
            <legend>Total Frame Rate</legend>
                <input type='text' className='frame-rate-input' disabled={true} value={frameRateInput} />
            </fieldset>
        </div>
    );
};

export default FlareSDIFrameRate;