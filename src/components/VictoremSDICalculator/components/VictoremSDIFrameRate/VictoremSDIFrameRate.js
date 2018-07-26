import React from 'react';
import { connect } from 'react-redux';
import { updateFrameRate } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIFrameRate.css';

const VictoremSDIFrameRate = ({
  frameRate,
  frameRates,
  handleChange,
}) => {
  const frameRateOptions = frameRates.map((frameRateOption, i) => (
    <option key={i} value={frameRateOption}>{frameRateOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Frame Rate</legend>
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
  } = calculatorState;
  return {
    frameRate,
    frameRates,
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

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIFrameRate);
