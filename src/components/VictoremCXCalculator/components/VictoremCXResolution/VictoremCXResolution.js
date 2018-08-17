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
  subSamplingBinning,
  handleChangeResolutionPreset,
  handleChangeWidth,
  handleChangeHeight,
}) => {
  const noneSelected = (subSamplingBinning === SUBSAMPLING_BINNING.NONE);
  const subSamplingSelected = (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING);
  const bin2x2Selected = (subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2);
  const resolutionPresetOptions = RESOLUTIONS.map((preset, i) => {
    let presetOption = preset;
    if (!NAN_RESOLUTIONS.includes(preset)) {
      presetOption = `${preset[0]}x${preset[1]}`;
    }

    return <option key={i} value={presetOption}>{presetOption}</option>;
  });
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
          disabled={subSamplingSelected || bin2x2Selected}
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
          disabled={!noneSelected}
          onChange={handleChangeWidth}
         />
        <input
          type="number"
          className={styles.wxh}
          step={heightStep}
          value={height}
          min={minHeight}
          max={maxHeight}
          disabled={!noneSelected}
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
    subSamplingBinning,
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
    resolutionTooltip,
    subSamplingBinning,
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
