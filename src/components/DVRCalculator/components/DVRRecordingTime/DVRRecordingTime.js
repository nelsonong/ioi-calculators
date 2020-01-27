import React from 'react';
import { connect } from 'react-redux';
import styles from './DVRRecordingTime.css';

const DVRRecordingTime = ({
  dataRateTooltip,
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
    {
      totalDataRate !== 0 && dataRateTooltip !== ''
      && <div className={styles.tooltip}>
        {dataRateTooltip}
      </div>
    }
  </fieldset>
);

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
  const calculatorState = storageCalculators[dvrId];
  const {
    dataRateTooltip,
    totalDataRate,
    totalCapacity,
    recordingTime,
  } = calculatorState;
  return {
    dataRateTooltip,
    totalDataRate,
    totalCapacity,
    recordingTime,
  };
};

export default connect(mapStateToProps)(DVRRecordingTime);
