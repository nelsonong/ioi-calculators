import React from 'react';
import './FlareCLFrameRate.css';

const FlareCLFrameRate = ({ frameRate, width, height }) => {
    const frameRateInput = `${frameRate} FPS [${width} x ${height}]`;
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={frameRateInput} />
        </fieldset>
    );
};

export default FlareCLFrameRate;