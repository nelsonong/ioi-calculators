import React from 'react';
import { connect } from 'react-redux';
import styles from './VictoremSDIOutput.css';

const VictoremSDIOutput = ({
  frameRate,
  dataRate,
}) => {
  const frameRateInput = `${frameRate} FPS ┋ ${dataRate} MB/s`;
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
    frameRate,
    dataRate,
  } = calculatorState;
  return {
    frameRate,
    dataRate,
  };
};

export default connect(mapStateToProps)(VictoremSDIOutput);
