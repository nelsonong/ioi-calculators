import React from 'react';
import { connect } from 'react-redux';
import styles from './VictoremCXOutput.css';

const VictoremCXOutput = ({
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

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
  const calculatorState = frameRateCalculators[cameraId];
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

export default connect(mapStateToProps)(VictoremCXOutput);
