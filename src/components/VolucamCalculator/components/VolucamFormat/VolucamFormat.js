import React from 'react';
import { connect } from 'react-redux';
import {
  updateADCBitDepth,
  updateOutputBitDepth,
  updateSensorDriveMode,
} from '../../../../actions/volucamActions';
import { SENSOR_DRIVE_MODES } from '../../constants';
import styles from './VolucamFormat.css';

const VolucamFormat = ({
  adcBitDepth,
  adcBitDepths,
  outputBitDepth,
  cameraMode,
  sensorDriveMode,
  handleChangeADCBitDepth,
  handleChangeOutputBitDepth,
  handleChangeSensorDriveMode,
}) => {
  const adcBitDepthOptions = adcBitDepths.map((adcBitDepthOption, i) => (
    <option key={i} value={adcBitDepthOption}>{adcBitDepthOption}</option>
  ));
  const outputBitDepths = [8, 10, 12].filter(e => e <= adcBitDepth);
  const outputBitDepthOptions = outputBitDepths.map((outputBitDepthOption, i) => (
    <option key={i} value={outputBitDepthOption}>{outputBitDepthOption}</option>
  ));
  const sensorDriveModeOptions = SENSOR_DRIVE_MODES.map(
    (sensorDriveModeOption, i) => (
      <option key={i} value={sensorDriveModeOption}>
        {sensorDriveModeOption}
      </option>
    ),
  );
  const enableSensorDriveMode = cameraMode === 1;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Format</legend>
      <div className={styles.left}>
        <div className={styles.label}>ADC Bit Depth:</div>
        <div className={styles.label}>Output Bit Depth:</div>
        { enableSensorDriveMode
          && <div className={styles.label}>Drive Mode:</div>
        }
      </div>
      <div className={styles.right}>
        <select className={styles.select} value={adcBitDepth} onChange={handleChangeADCBitDepth}>
          {adcBitDepthOptions}
        </select>
        <select
          className={styles.select}
          value={outputBitDepth}
          onChange={handleChangeOutputBitDepth}
        >
          {outputBitDepthOptions}
        </select>
        { enableSensorDriveMode
          && <select
            className={styles.select}
            value={sensorDriveMode}
            onChange={handleChangeSensorDriveMode}
          >
            {sensorDriveModeOptions}
          </select>
        }
      </div>
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    cameraMode,
    sensorDriveMode,
  } = calculatorState;
  return {
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    cameraMode,
    sensorDriveMode,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChangeADCBitDepth: (e) => {
    const adcBitDepth = Number(e.target.value);
    dispatch(updateADCBitDepth(cameraId, adcBitDepth));
  },
  handleChangeOutputBitDepth: (e) => {
    const outputBitDepth = Number(e.target.value);
    dispatch(updateOutputBitDepth(cameraId, outputBitDepth));
  },
  handleChangeSensorDriveMode: (e) => {
    const sensorDriveMode = e.target.value;
    dispatch(updateSensorDriveMode(cameraId, sensorDriveMode));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamFormat);
