import React from 'react';
import './FlareCLOutput.css';

const FlareCLOutput = ({ frameRate, dataRate }) => {
    const frameRateInput = `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <fieldset>
        <legend>Output</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={frameRateInput} />
        </fieldset>
    );
};

export default FlareCLOutput;