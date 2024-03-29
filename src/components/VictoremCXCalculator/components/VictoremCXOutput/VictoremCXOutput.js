import React from 'react';
import { connect } from 'react-redux';
import styles from './VictoremCXOutput.css';
import VictoremCXFrameRate from './VictoremCXFrameRate';

const VictoremCXOutput = ({
  frameRate,
  dataRate,
  error,
  cameraId,
  dvrId,
}) => {
  const frameRateDisplay = Number(frameRate).toFixed(2);
  const outputText = error ? 'N/A' : `${frameRateDisplay} FPS ┋ ${dataRate} MB/s`;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output</legend>
      {dvrId ? <VictoremCXFrameRate cameraId={cameraId} dvrId={dvrId} /> : ''}
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
    error,
  } = calculatorState;
  return {
    frameRate,
    dataRate,
    error,
    cameraId,
    dvrId,
  };
};

export default connect(mapStateToProps)(VictoremCXOutput);
