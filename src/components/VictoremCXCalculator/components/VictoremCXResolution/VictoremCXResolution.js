import React from 'react';
import { connect } from 'react-redux';
import {
  updateResolutionPreset,
  updateWidth,
  updateHeight,
} from '../../../../actions/victoremCXActions';
import {
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
} from '../../constants';
import styles from './VictoremCXResolution.css';

const VictoremCXResolution = ({
  resolutionPreset,
  resolutionPresets,
  width,
  widthStep,
  minWidth,
  maxWidth,
  height,
  heightStep,
  minHeight,
  maxHeight,
  resolutionTooltip,
  cameraMode,
  subSamplingBinning,
  sensorDriveMode,
  handleChangeResolutionPreset,
  handleChangeWidth,
  handleChangeHeight,
}) => {
  const resolutionPresetOptions = resolutionPresets.map((resolutionPresetOption, i) => (
    <option key={i} value={resolutionPresetOption}>{resolutionPresetOption}</option>
  ));
  let enableResolution = false;
  switch (cameraMode) {
    case 0: {
      enableResolution = subSamplingBinning === SUBSAMPLING_BINNING.NONE;
      break;
    }

    case 1: {
      enableResolution = sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10;
      break;
    }

    case 2: {
      enableResolution = true;
      break;
    }

    default:
      break;
  }

  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Resolution</legend>
      <div className={styles.left}>
        <div className={styles.label}>Presets:</div>
        <div className={styles.label}>W x H:</div>
      </div>
      <div className={styles.right}>
        <select
          className={styles.select}
          value={resolutionPreset}
          disabled={!enableResolution}
          onChange={handleChangeResolutionPreset}
        >
          {resolutionPresetOptions}
        </select>
        <br />
        <input
          type="number"
          className={styles.wxh}
          step={widthStep} value={width}
          min={minWidth}
          max={maxWidth}
          disabled={!enableResolution}
          onChange={handleChangeWidth}
          onClick={e => e.target.select()}
         />
        <input
          type="number"
          className={styles.wxh}
          step={heightStep}
          value={height}
          min={minHeight}
          max={maxHeight}
          disabled={!enableResolution}
          onChange={handleChangeHeight}
          onClick={e => e.target.select()}
         />
      </div>
      {
        resolutionTooltip !== ''
        && <div className={styles.tooltip}>
          {resolutionTooltip}
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
    resolutionPreset,
    resolutionPresets,
    width,
    widthStep,
    minWidth,
    maxWidth,
    height,
    heightStep,
    minHeight,
    maxHeight,
    resolutionTooltip,
    cameraMode,
    subSamplingBinning,
    sensorDriveMode,
  } = calculatorState;
  return {
    resolutionPreset,
    resolutionPresets,
    width,
    widthStep,
    minWidth,
    maxWidth,
    height,
    heightStep,
    minHeight,
    maxHeight,
    cameraMode,
    resolutionTooltip,
    subSamplingBinning,
    sensorDriveMode,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeResolutionPreset: (e) => {
    const resolutionPreset = e.target.value;
    dispatch(updateResolutionPreset(cameraId, resolutionPreset, dvrId));
  },

  handleChangeWidth: (e) => {
    const width = parseInt(Number(e.target.value), 10);
    e.target.value = width;
    dispatch(updateWidth(cameraId, width, dvrId));
  },

  handleChangeHeight: (e) => {
    const height = parseInt(Number(e.target.value), 10);
    e.target.value = height;
    dispatch(updateHeight(cameraId, height, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXResolution);
