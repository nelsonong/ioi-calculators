import React from 'react';
import { connect } from 'react-redux';
import {
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
} from '../../constants';
import {
  updateResolutionPreset,
  updateWidth,
  updateHeight,
} from '../../../../actions/redwoodActions';
import styles from './RedwoodResolution.css';

const RedwoodResolution = ({
  cameraMode,
  subSamplingBinning,
  sensorDriveMode,
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
      enableResolution = subSamplingBinning === SUBSAMPLING_BINNING.NONE
        || subSamplingBinning !== SUBSAMPLING_BINNING.SUBSAMPLING;
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

  const subSampling = subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING;
  const displayedWidth = subSampling ? width / 2 : width;
  const displayedHeight = subSampling ? height / 2 : height;

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
          step={widthStep}
          value={displayedWidth}
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
          value={displayedHeight}
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
    cameraMode,
    subSamplingBinning,
    sensorDriveMode,
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
  } = calculatorState;
  return {
    cameraMode,
    subSamplingBinning,
    sensorDriveMode,
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

export default connect(mapStateToProps, mapDispatchToProps)(RedwoodResolution);
