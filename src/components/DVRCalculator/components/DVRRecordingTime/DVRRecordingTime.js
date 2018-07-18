import React from 'react';
import { connect } from 'react-redux';
import styles from './DVRRecordingTime.css';

const DVRRecordingTime = ({ recordingTime }) => (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Recording Time</legend>
        <input type='text' className={styles.input} disabled={true} value={recordingTime} />
    </fieldset>
);

const mapStateToProps = ({ storageCalculators }, { id }) => {
    const calculatorState = storageCalculators.get(id);
    const { recordingTime } = calculatorState;
    return {
        recordingTime
    };
};

export default connect(mapStateToProps)(DVRRecordingTime);