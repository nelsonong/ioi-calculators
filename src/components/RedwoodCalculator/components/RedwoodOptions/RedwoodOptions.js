import React from 'react';
import { connect } from 'react-redux';
import {
  updateSubSamplingBinningMode,
  updateSensorDriveMode,
} from '../../../../actions/redwoodActions';
import {
  SENSOR,
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODES,
} from '../../constants';
import styles from './RedwoodOptions.css';

const RedwoodOptions = ({
  cameraMode,
  sensor,
  adcBitDepth,
  dualGain,
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
  const optionsExist = cameraMode === 0 || cameraMode === 1;
  const dualGainEnabled = sensor === SENSOR.Onsemi && adcBitDepth === 12 && dualGain === true;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Options</legend>
      { !optionsExist && <div className={styles.message}>No options available for this model.</div> }
      { optionsExist
      && <div>
        { cameraMode === 0
          && <div className={styles.label}>Sub-Sample / Binning:</div>
        }
        { cameraMode === 0
          && <select
            className={styles.select}
            value={subSamplingBinning}
            disabled={cameraMode !== 0 || dualGainEnabled === true}
            onChange={handleChangeSubSamplingBinning}
          >
            {subSamplingBinningOptions}
          </select>
        }
        { cameraMode === 1
          && <div className={styles.label}>Sensor Drive Mode:</div>
        }
        { cameraMode === 1
          && <select
            className={styles.select}
            value={sensorDriveMode}
            disabled={cameraMode !== 1}
            onChange={handleChangeSensorDriveMode}
          >
            {sensorDriveModeOptions}
          </select>
        }
      </div>
    }
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
    sensor,
    adcBitDepth,
    dualGain,
    supports2x2Binning,
    supportsSubSampling,
    supportsHorizontalBinning,
    supportsVerticalBinning,
    subSamplingBinning,
    sensorDriveMode,
  } = calculatorState;
  return {
    cameraMode,
    sensor,
    adcBitDepth,
    dualGain,
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

export default connect(mapStateToProps, mapDispatchToProps)(RedwoodOptions);
