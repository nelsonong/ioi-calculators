import React from 'react';
import './RecordingTime.css';

function RecordingTime({ recordingTime }) {
    return (
        <fieldset>
        <legend>Recording Time</legend>
            <input type='text' className='recording-time-input' disabled={true} value={recordingTime} />
        </fieldset>
    );
}

export default RecordingTime;