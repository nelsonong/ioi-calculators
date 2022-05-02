import React from 'react';
import { connect } from 'react-redux';
import {
  updateFormat,
  updateADCBitDepth,
  updateOutputBitDepth,
} from '../../../../actions/victoremCXActions';
import styles from './VictoremCXFormat.css';
import { MODEL } from '../../../Core2Calculator/constants';

const VictoremCXFormat = ({
  model,
  format,
  adcBitDepth,
  adcBitDepths,
  outputBitDepth,
  formats,
  handleInitFormat,
  handleChangeFormat,
  handleChangeADCBitDepth,
  handleChangeOutputBitDepth,
}) => {
  // Limit CXP speed options depending on Core type.
  let maxLinkSpeed = 12;
  if (model) {
    if (model === MODEL.CORE2CX) {
      maxLinkSpeed = 3;
    } else if (model === MODEL.CORE2CXPLUS || model === MODEL.CORE2CXMAX) {
      maxLinkSpeed = 6;
    }
  }

  let selectedFormatDeleted = true;
  let selectedFormat;
  const formatOptions = formats.map((formatOption, i) => {
    const trailingNumbers = formatOption.match(/\d+$/);
    const linkSpeed = Number(trailingNumbers[0]);
    if (linkSpeed <= maxLinkSpeed) {
      if (format === formatOption) {
        selectedFormatDeleted = false;
      }

      if (!selectedFormat) {
        selectedFormat = formatOption;
      }

      return <option key={i} value={formatOption}>{formatOption}</option>;
    }

    return '';
  });

  if (selectedFormatDeleted) {
    handleInitFormat(selectedFormat);
  }

  const adcBitDepthOptions = adcBitDepths.map((adcBitDepthOption, i) => (
    <option key={i} value={adcBitDepthOption}>{adcBitDepthOption}</option>
  ));
  const outputBitDepths = [8, 10, 12].filter(e => e <= adcBitDepth);
  const outputBitDepthOptions = outputBitDepths.map((outputBitDepthOption, i) => (
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
  let calculatorState;
  let model;
  if (!dvrId) {
    calculatorState = state.frameRateCalculators[cameraId];
  } else {
    calculatorState = state.storageCalculators[dvrId].cameras[cameraId];
    ({ model } = state.storageCalculators[dvrId]);
  }

  const {
    format,
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    formats,
  } = calculatorState;
  return {
    model,
    format,
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    formats,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleInitFormat: (format) => {
    dispatch(updateFormat(cameraId, format, dvrId));
  },
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
