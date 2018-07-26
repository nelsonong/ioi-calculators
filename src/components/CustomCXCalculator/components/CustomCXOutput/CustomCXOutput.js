import React from 'react';
import { connect } from 'react-redux';
import styles from './CustomCXOutput.css';

const CustomCXOutput = ({
  frameRate,
  dataRate,
  error,
}) => {
  const outputText = error ? 'N/A' : `${frameRate} FPS / ${dataRate} MB/s`;
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
    frameRate,
    dataRate,
    error,
  } = calculatorState;
  return {
    frameRate,
    dataRate,
    error,
  };
};

export default connect(mapStateToProps)(CustomCXOutput);
