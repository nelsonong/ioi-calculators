import React from 'react';
import { connect } from 'react-redux';
import styles from './VolucamRecordingTime.css';

const VolucamRecordingTime = ({
  dataRate,
  recordingTime,
}) => {
  const outputText = `${recordingTime} ┋ ${dataRate.toFixed(2)} MB/s`;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output</legend>
      <input type='text' className={styles.input} disabled={true} value={outputText} />
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    dataRate,
    recordingTime,
  } = calculatorState;
  return {
    dataRate,
    recordingTime,
  };
};

export default connect(mapStateToProps)(VolucamRecordingTime);
