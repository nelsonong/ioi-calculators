import React from 'react';

function FrameRate(props) {
    return (
        <fieldset>
        <legend>Frame Rate</legend>
            <input type='text' className='frameRate' disabled={true} value={props.frameRate} />
        </fieldset>
    );
}

export default FrameRate;