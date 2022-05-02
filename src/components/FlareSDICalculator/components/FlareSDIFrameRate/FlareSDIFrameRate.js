import React from 'react';
import { connect } from 'react-redux';
import { updateFrameRate } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIFrameRate.css';

const FlareSDIFrameRate = ({
  frameRate,
  frameRates,
  interlaced,
  handleChange,
}) => {
  const frameRateOptions = frameRates.map((frameRateOption, i) => (
    <option key={i} value={frameRateOption}>{frameRateOption}</option>
  ));
  const label = interlaced ? 'Field Rate' : 'Frame Rate';
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>{label}</legend>
      <select className={styles.select} value={frameRate} onChange={handleChange}>
        {frameRateOptions}
      </select>
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
    frameRates,
    interlaced,
  } = calculatorState;
  return {
    frameRate,
    frameRates,
    interlaced,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const frameRate = Number(e.target.value);
    dispatch(updateFrameRate(cameraId, frameRate, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIFrameRate);
