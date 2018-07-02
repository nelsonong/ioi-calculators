import React from 'react';
import './VictoremFrameRate.css';

function VictoremFrameRate({ frameRate }) {
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={frameRate} />
        </fieldset>
    );
}

export default VictoremFrameRate;