import React from 'react';
import { connect } from 'react-redux';
import styles from './RedwoodOutput.css';
import RedwoodFrameRate from './RedwoodFrameRate';

const RedwoodOutput = ({
  frameRate,
  dataRate,
  cameraId,
  dvrId,
}) => {
  const outputText = (frameRate && dataRate) ? `${frameRate.toFixed(2)} FPS ┋ ${dataRate.toFixed(2)} MB/s` : 'N/A';
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output</legend>
      {dvrId ? <RedwoodFrameRate cameraId={cameraId} dvrId={dvrId} /> : ''}
      <input type='text' className={styles.input} disabled={true} value={outputText} />
    </fieldset>
  );
};

const mapStateToProps = (state, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = !dvrId
    ? state.frameRateCalculators[cameraId]
    : state.storageCalculators[dvrId].cameras[cameraId];
  const {
    frameRate,
    dataRate,
  } = calculatorState;
  return {
    frameRate,
    dataRate,
    cameraId,
    dvrId,
  };
};

export default connect(mapStateToProps)(RedwoodOutput);
