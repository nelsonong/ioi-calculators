import React from 'react';
import './FlareFrameRate.css';

function FlareFrameRate({ frameRate }) {
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={frameRate} />
        </fieldset>
    );
}

export default FlareFrameRate;