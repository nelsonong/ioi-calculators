import React from 'react';
import './DVRRecordingTime.css';

function DVRRecordingTime({ recordingTime }) {
    return (
        <fieldset>
        <legend>Recording Time</legend>
            <input type='text' className='recording-time-input' disabled={true} value={recordingTime} />
        </fieldset>
    );
}

export default DVRRecordingTime;