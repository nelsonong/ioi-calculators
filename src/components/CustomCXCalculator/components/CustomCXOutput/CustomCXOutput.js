import React from 'react';
import { connect } from 'react-redux';
import styles from './CustomCXOutput.css';

const CustomCXOutput = ({
  frameRateOutput,
  dataRate,
  error,
}) => {
  const outputText = error ? 'N/A' : `${frameRateOutput} FPS ┋ ${dataRate} MB/s`;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output</legend>
      <input type='text' className={styles.input} disabled={true} value={outputText} />
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = storageCalculators[dvrId].cameras[cameraId];
  const {
    frameRateOutput,
    dataRate,
    error,
  } = calculatorState;
  return {
    frameRateOutput,
    dataRate,
    error,
  };
};

export default connect(mapStateToProps)(CustomCXOutput);
