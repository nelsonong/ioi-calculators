import React from 'react';
import './FrameRate.css';

function FrameRate({ frameRate }) {
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={frameRate} />
        </fieldset>
    );
}

export default FrameRate;