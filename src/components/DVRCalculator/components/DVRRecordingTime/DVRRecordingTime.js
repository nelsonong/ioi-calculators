import React from 'react';
import styles from './DVRRecordingTime.css';

const DVRRecordingTime = ({ recordingTime }) => (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Recording Time</legend>
        <input type='text' className={styles.input} disabled={true} value={recordingTime} />
    </fieldset>
);

export default DVRRecordingTime;