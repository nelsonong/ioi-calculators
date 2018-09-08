import React from 'react';
import { connect } from 'react-redux';
import {
  updateFormat,
  updateADCBitDepth,
  updateOutputBitDepth,
} from '../../../../actions/victoremCXActions';
import styles from './VictoremCXFormat.css';

const VictoremCXFormat = ({
  format,
  adcBitDepth,
  adcBitDepths,
  supportsOutputBitDepths,
  outputBitDepth,
  formats,
  handleChangeFormat,
  handleChangeADCBitDepth,
  handleChangeOutputBitDepth,
}) => {
  const formatOptions = formats.map((formatOption, i) => (
    <option key={i} value={formatOption}>{formatOption}</option>
  ));
  const adcBitDepthOptions = adcBitDepths.map((adcBitDepthOption, i) => (
    <option key={i} value={adcBitDepthOption}>{adcBitDepthOption}</option>
  ));
  const outputBitDepthOptions = [8, 10, 12].map((outputBitDepthOption, i) => (
    <option key={i} value={outputBitDepthOption}>{outputBitDepthOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output Format</legend>
      <div className={styles.left}>
        <div className={styles.label}>Link:</div>
        <div className={styles.label}>ADC Bit Depth:</div>
        <div className={styles.label}>Output Bit Depth:</div>
      </div>
      <div className={styles.right}>
        <select className={styles.select} value={format} onChange={handleChangeFormat}>
          {formatOptions}
        </select>
        <select className={styles.select} value={adcBitDepth} onChange={handleChangeADCBitDepth}>
          {adcBitDepthOptions}
        </select>
        <select
          className={styles.select}
          value={outputBitDepth}
          disabled={!supportsOutputBitDepths}
          onChange={handleChangeOutputBitDepth}
        >
          {outputBitDepthOptions}
        </select>
      </div>
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
    format,
    adcBitDepth,
    adcBitDepths,
    supportsOutputBitDepths,
    outputBitDepth,
    formats,
  } = calculatorState;
  return {
    format,
    adcBitDepth,
    adcBitDepths,
    supportsOutputBitDepths,
    outputBitDepth,
    formats,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeFormat: (e) => {
    const format = e.target.value;
    dispatch(updateFormat(cameraId, format, dvrId));
  },
  handleChangeADCBitDepth: (e) => {
    const adcBitDepth = Number(e.target.value);
    dispatch(updateADCBitDepth(cameraId, adcBitDepth, dvrId));
  },
  handleChangeOutputBitDepth: (e) => {
    const outputBitDepth = Number(e.target.value);
    dispatch(updateOutputBitDepth(cameraId, outputBitDepth, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXFormat);
