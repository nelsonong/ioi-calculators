import React from 'react';
import { connect } from 'react-redux';
import styles from './DVRRecordingTime.css';

const DVRRecordingTime = ({
  totalDataRate,
  totalCapacity,
  recordingTime,
}) => (
  <fieldset className={styles.root}>
  <legend className={styles.legend}>Output</legend>
    <div className={styles.center}>
      <input type='text' className={styles.display} disabled value={`${totalDataRate} MB/s`} />
      <input type='text' className={styles.display} disabled value={`${totalCapacity} GB`} />
    </div>
    <input type='text' className={styles.input} disabled={true} value={recordingTime} />
  </fieldset>
);

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
  const calculatorState = storageCalculators[dvrId];
  const {
    totalDataRate,
    totalCapacity,
    recordingTime,
  } = calculatorState;
  return {
    totalDataRate,
    totalCapacity,
    recordingTime,
  };
};

export default connect(mapStateToProps)(DVRRecordingTime);
