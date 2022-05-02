import React from 'react';
import { connect } from 'react-redux';
import {
  updateADCBitDepth,
  updateOutputBitDepth,
  updateFirmware,
  updateScaling,
  updateDualGain,
  updateSensorDriveMode,
} from '../../../../actions/volucamActions';
import {
  MODELS,
  FIRMWARE,
  SENSOR_DRIVE_MODES,
} from '../../constants';
import styles from './VolucamFormat.css';

const VolucamFormat = ({
  model,
  adcBitDepth,
  adcBitDepths,
  outputBitDepth,
  cameraMode,
  firmware,
  scaling,
  dualGain,
  sensorDriveMode,
  handleChangeADCBitDepth,
  handleChangeOutputBitDepth,
  handleChangeFirmware,
  handleChangeScaling,
  handleChangeDualGain,
  handleChangeSensorDriveMode,
}) => {
  const firmwares = [FIRMWARE.STANDARD, FIRMWARE.COMPRESSED_8];
  if (MODELS.TYPE_530.includes(model)) firmwares.push(FIRMWARE.COMPRESSED_12);
  const firmwareOptions = firmwares.map((firmwareOption, i) => (
    <option key={i} value={firmwareOption}>{firmwareOption}</option>
  ));

  // Filter ADC bit depths
  let firmwareBitDepths = adcBitDepths;
  if (firmware === FIRMWARE.COMPRESSED_12) {
    firmwareBitDepths = adcBitDepths.filter(firmwareBitDepth => firmwareBitDepth >= 12);
  } else if (firmware === FIRMWARE.COMPRESSED_10) {
    firmwareBitDepths = adcBitDepths.filter(firmwareBitDepth => firmwareBitDepth >= 10);
  }
  const adcBitDepthOptions = firmwareBitDepths.map((adcBitDepthOption, i) => (
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
  const enableScaling = MODELS.TYPE_253.includes(model);
  const enableSensorDriveMode = cameraMode === 1;
  const imx530 = MODELS.TYPE_530.includes(model);
  const fast12Model = imx530 && firmware === FIRMWARE.COMPRESSED_12;
  const enableDualGain = imx530 && adcBitDepth === 12 && !fast12Model;
  const compressionEnabled = firmware !== FIRMWARE.STANDARD;
  let firmwareStyle = styles.select;
  if (compressionEnabled) firmwareStyle = styles.compressionSelect;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Format</legend>
      <div className={styles.left}>
        <div className={styles.label}>Firmware:</div>
        { enableScaling
          && <div className={styles.label}>3:2 Image Scaling:</div>
        }
        <div className={styles.label}>ADC Bit Depth:</div>
        <div className={styles.label}>Output Bit Depth:</div>
        { enableDualGain
          && <div className={styles.label}>Dual Gain HDR:</div>
        }
        { enableSensorDriveMode
          && <div className={styles.label}>Drive Mode:</div>
        }
      </div>
      <div className={styles.right}>
        <select className={firmwareStyle} value={firmware} onChange={handleChangeFirmware}
        >
          {firmwareOptions}
        </select>
        { enableScaling
          && <input
            type="checkbox"
            key={Math.random()}
            className={styles.checkbox}
            defaultChecked={scaling}
            onChange={handleChangeScaling}
          />
        }
        <select
          className={styles.select}
          value={adcBitDepth}
          disabled={scaling}
          onChange={handleChangeADCBitDepth}
        >
          {adcBitDepthOptions}
        </select>
        <select
          className={styles.select}
          value={outputBitDepth}
          disabled={compressionEnabled || scaling}
          onChange={handleChangeOutputBitDepth}
        >
          {outputBitDepthOptions}
        </select>
        { enableDualGain
          && <input
            type="checkbox"
            key={Math.random()}
            className={styles.checkbox}
            defaultChecked={dualGain}
            onChange={handleChangeDualGain}
          />
        }
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
    model,
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    cameraMode,
    firmware,
    scaling,
    dualGain,
    sensorDriveMode,
  } = calculatorState;
  return {
    model,
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    cameraMode,
    firmware,
    scaling,
    dualGain,
    sensorDriveMode,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChangeFirmware: (e) => {
    const firmware = e.target.value;
    dispatch(updateFirmware(cameraId, firmware));
  },
  handleChangeScaling: (e) => {
    const scaling = e.target.checked;
    dispatch(updateScaling(cameraId, scaling));
  },
  handleChangeADCBitDepth: (e) => {
    const adcBitDepth = Number(e.target.value);
    dispatch(updateADCBitDepth(cameraId, adcBitDepth));
  },
  handleChangeOutputBitDepth: (e) => {
    const outputBitDepth = Number(e.target.value);
    dispatch(updateOutputBitDepth(cameraId, outputBitDepth));
  },
  handleChangeDualGain: (e) => {
    const dualGain = e.target.checked;
    dispatch(updateDualGain(cameraId, dualGain));
  },
  handleChangeSensorDriveMode: (e) => {
    const sensorDriveMode = e.target.value;
    dispatch(updateSensorDriveMode(cameraId, sensorDriveMode));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamFormat);
