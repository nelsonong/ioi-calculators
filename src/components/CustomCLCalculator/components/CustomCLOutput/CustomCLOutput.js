import React from 'react';
import { connect } from 'react-redux';
import styles from './CustomCLOutput.css';

const CustomCLOutput = ({
  frameRate,
  dataRate,
}) => {
  const outputText = `${frameRate} FPS / ${dataRate} MB/s`;
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
  } = calculatorState;
  return {
    frameRate,
    dataRate,
  };
};

export default connect(mapStateToProps)(CustomCLOutput);
