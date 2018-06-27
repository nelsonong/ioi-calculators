import React from 'react';
import './FrameRate.css';

function FrameRate(props) {
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frame-rate-input' disabled={true} value={props.frameRate} />
        </fieldset>
    );
}

export default FrameRate;