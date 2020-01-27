import React from 'react';
import { connect } from 'react-redux';
import { SENSOR_DRIVE_MODE } from '../../constants';
import {
  updateResolutionPreset,
  updateWidth,
  updateHeight,
} from '../../../../actions/volucamActions';
import styles from './VolucamResolution.css';

const VolucamResolution = ({
  cameraMode,
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
  const disableResolution = (cameraMode === 1) && (sensorDriveMode !== SENSOR_DRIVE_MODE.ALL_10);
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
          disabled={disableResolution}
          onChange={handleChangeResolutionPreset}
        >
          {resolutionPresetOptions}
        </select>
        <br />
        <input
          type="number"
          className={styles.wxh}
          step={widthStep}
          value={width}
          min={minWidth}
          max={maxWidth}
          disabled={disableResolution}
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
          disabled={disableResolution}
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

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    cameraMode,
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

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChangeResolutionPreset: (e) => {
    const resolutionPreset = e.target.value;
    dispatch(updateResolutionPreset(cameraId, resolutionPreset));
  },

  handleChangeWidth: (e) => {
    const width = parseInt(Number(e.target.value), 10);
    e.target.value = width;
    dispatch(updateWidth(cameraId, width));
  },

  handleChangeHeight: (e) => {
    const height = parseInt(Number(e.target.value), 10);
    e.target.value = height;
    dispatch(updateHeight(cameraId, height));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamResolution);
