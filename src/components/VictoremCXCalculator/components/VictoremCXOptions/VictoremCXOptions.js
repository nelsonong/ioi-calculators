import React from 'react';
import { connect } from 'react-redux';
import {
  updateSubSamplingBinningMode,
  updateSensorDriveMode,
} from '../../../../actions/victoremCXActions';
import {
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODES,
} from '../../constants';
import styles from './VictoremCXOptions.css';

const VictoremCXOptions = ({
  cameraMode,
  supports2x2Binning,
  supportsSubSampling,
  supportsHorizontalBinning,
  supportsVerticalBinning,
  subSamplingBinning,
  sensorDriveMode,
  handleChangeSubSamplingBinning,
  handleChangeSensorDriveMode,
}) => {
  const supportedOptions = [SUBSAMPLING_BINNING.NONE];
  if (supportsSubSampling) supportedOptions.push(SUBSAMPLING_BINNING.SUBSAMPLING);
  if (supportsHorizontalBinning) supportedOptions.push(SUBSAMPLING_BINNING.BIN_HORIZONTAL);
  if (supportsVerticalBinning) supportedOptions.push(SUBSAMPLING_BINNING.BIN_VERTICAL);
  if (supports2x2Binning) supportedOptions.push(SUBSAMPLING_BINNING.BIN_2X2);
  const subSamplingBinningOptions = supportedOptions.map(
    (subSamplingBinningOption, i) => (
      <option key={i} value={subSamplingBinningOption}>
        {subSamplingBinningOption}
      </option>
    ),
  );
  const sensorDriveModeOptions = SENSOR_DRIVE_MODES.map(
    (sensorDriveModeOption, i) => (
      <option key={i} value={sensorDriveModeOption}>
        {sensorDriveModeOption}
      </option>
    ),
  );
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Options</legend>
        <div className={styles.label}>Sub-Sample / Binning:</div>
        <select
          className={styles.select}
          value={subSamplingBinning}
          disabled={cameraMode === 1}
          onChange={handleChangeSubSamplingBinning}
        >
          {subSamplingBinningOptions}
        </select>
        <div className={styles.label}>Sensor Drive Mode:</div>
        <select
          className={styles.select}
          value={sensorDriveMode}
          disabled={cameraMode === 0}
          onChange={handleChangeSensorDriveMode}
        >
          {sensorDriveModeOptions}
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
    cameraMode,
    supports2x2Binning,
    supportsSubSampling,
    supportsHorizontalBinning,
    supportsVerticalBinning,
    subSamplingBinning,
    sensorDriveMode,
  } = calculatorState;
  return {
    cameraMode,
    supports2x2Binning,
    supportsSubSampling,
    supportsHorizontalBinning,
    supportsVerticalBinning,
    subSamplingBinning,
    sensorDriveMode,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeSubSamplingBinning: (e) => {
    const subSamplingBinning = e.target.value;
    dispatch(updateSubSamplingBinningMode(cameraId, subSamplingBinning, dvrId));
  },
  handleChangeSensorDriveMode: (e) => {
    const sensorDriveMode = e.target.value;
    dispatch(updateSensorDriveMode(cameraId, sensorDriveMode, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXOptions);
