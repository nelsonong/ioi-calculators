import React, { Component } from 'react';

function FrameRate(props) {
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frameRate' disabled={true} value={props.frameRate + ' FPS'} />
        </fieldset>
    );
}

export default FrameRate;