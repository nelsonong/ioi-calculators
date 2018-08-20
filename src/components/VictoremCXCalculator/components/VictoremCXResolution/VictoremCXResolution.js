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
  const resolutionPresetOptions = RESOLUTIONS.map((preset, i) => {
    let presetOption = preset;
    if (!NAN_RESOLUTIONS.includes(preset)) {
      presetOption = `${preset[0]}x${preset[1]}`;
    }

    return <option key={i} value={presetOption}>{presetOption}</option>;
  });
  let enableResolution = false;
  switch (cameraMode) {
    case 0: {
      const noneSelected = (subSamplingBinning === SUBSAMPLING_BINNING.NONE);
      const binvSelected = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL);
      enableResolution = (noneSelected || binvSelected);
      break;
    }

    case 1:
      enableResolution = (sensorDriveMode === SENSOR_DRIVE_MODE.ALL_10);

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
    const width = Number(e.target.value);
    dispatch(updateWidth(cameraId, width, dvrId));
  },

  handleChangeHeight: (e) => {
    const height = Number(e.target.value);
    dispatch(updateHeight(cameraId, height, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXResolution);
