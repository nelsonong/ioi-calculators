import React from 'react';
import { connect } from 'react-redux';
import {
  updateFormat,
  updateADCBitDepth,
  updateOutputBitDepth,
  updateDualGain,
} from '../../../../actions/redwoodActions';
import styles from './RedwoodFormat.css';
import { SENSOR } from '../../constants';
import { MODEL as CORE2MODELS } from '../../../Core2Calculator/constants';
import { MODEL as RODEOMODELS } from '../../../RodeoCalculator/constants';

const getLinkCountAndSpeed = (format) => {
  const trailingNumbers = format.match(/\d+$/);
  const linkSpeed = Number(trailingNumbers[0]);
  const linkCount = Number(format[0]);
  return [linkCount, linkSpeed];
};

const RedwoodFormat = ({
  sensor,
  model,
  format,
  formats,
  adcBitDepth,
  adcBitDepths,
  outputBitDepth,
  dualGain,
  handleInitFormat,
  handleChangeFormat,
  handleChangeADCBitDepth,
  handleChangeOutputBitDepth,
  handleChangeDualGain,
}) => {
  // Limit CXP options depending on DVR type.
  let maxLinkSpeed = 12;
  let maxTotalSpeed = 48;
  if (model) {
    if (model === CORE2MODELS.CORE2CX) {
      maxLinkSpeed = 3;
    } else if (model === CORE2MODELS.CORE2CXPLUS || model === CORE2MODELS.CORE2CXMAX) {
      maxLinkSpeed = 6;
    } else if (model === RODEOMODELS.RODEOCX) {
      maxTotalSpeed = 24;
    }
  }

  const [currentLinkCount, currentLinkSpeed] = getLinkCountAndSpeed(format);
  const invalidFormat = (currentLinkCount * currentLinkSpeed) > maxTotalSpeed;
  let updatedFormat;
  const formatOptions = formats.map((formatOption, i) => {
    const [linkCount, linkSpeed] = getLinkCountAndSpeed(formatOption);
    if (linkSpeed <= maxLinkSpeed) {
      const totalSpeed = linkSpeed * linkCount;
      if (totalSpeed <= maxTotalSpeed) {
        if (invalidFormat && !updatedFormat) {
          updatedFormat = formatOption;
        }
        return <option key={i} value={formatOption}>{formatOption}</option>;
      }
    }

    return '';
  });

  if (updatedFormat) {
    handleInitFormat(updatedFormat);
  }

  const adcBitDepthOptions = adcBitDepths.map((adcBitDepthOption, i) => (
    <option key={i} value={adcBitDepthOption}>{adcBitDepthOption}</option>
  ));
  const outputBitDepths = [8, 10, 12].filter(e => e <= adcBitDepth);
  const outputBitDepthOptions = outputBitDepths.map((outputBitDepthOption, i) => (
    <option key={i} value={outputBitDepthOption}>{outputBitDepthOption}</option>
  ));
  const enableDualGain = sensor === SENSOR.Onsemi && adcBitDepth === 12;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Format</legend>
      <div className={styles.left}>
        <div className={styles.label}>Link:</div>
        <div className={styles.label}>ADC Bit Depth:</div>
        <div className={styles.label}>Output Bit Depth:</div>
        { enableDualGain
          && <div className={styles.label}>Dual Gain HDR mode:</div>
        }
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
        { enableDualGain
          && <input
            type="checkbox"
            key={Math.random()}
            className={styles.checkbox}
            defaultChecked={dualGain}
            onChange={handleChangeDualGain}
          />
        }
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
    sensor,
    format,
    formats,
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    cameraMode,
    dualGain,
    sensorDriveMode,
  } = calculatorState;
  return {
    sensor,
    model,
    format,
    formats,
    adcBitDepth,
    adcBitDepths,
    outputBitDepth,
    cameraMode,
    dualGain,
    sensorDriveMode,
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
  handleChangeDualGain: (e) => {
    const dualGain = e.target.checked;
    dispatch(updateDualGain(cameraId, dualGain));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RedwoodFormat);
