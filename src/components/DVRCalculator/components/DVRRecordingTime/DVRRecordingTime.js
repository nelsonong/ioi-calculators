import React from 'react';
import './DVRRecordingTime.css';

const DVRRecordingTime = ({ recordingTime }) => (
    <fieldset>
    <legend>Recording Time</legend>
        <input type='text' className='recording-time-input' disabled={true} value={recordingTime} />
    </fieldset>
);

export default DVRRecordingTime;