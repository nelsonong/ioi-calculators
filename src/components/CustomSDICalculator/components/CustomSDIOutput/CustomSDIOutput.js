import React from 'react';
import { connect } from 'react-redux';
import styles from './CustomSDIOutput.css';

const CustomSDIOutput = ({
  interlaced,
  frameRate,
  dataRate,
}) => {
  const interlacedDivider = interlaced ? 2 : 1;
  const displayFrameRate = (frameRate / interlacedDivider).toFixed(2);
  const displayDataRate = (dataRate / interlacedDivider).toFixed(2);
  const frameRateInput = `${displayFrameRate} FPS ┋ ${displayDataRate} MB/s`;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output</legend>
      <input type='text' className={styles.input} disabled={true} value={frameRateInput} />
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
    interlaced,
    frameRate,
    dataRate,
  } = calculatorState;
  return {
    interlaced,
    frameRate,
    dataRate,
  };
};

export default connect(mapStateToProps)(CustomSDIOutput);
