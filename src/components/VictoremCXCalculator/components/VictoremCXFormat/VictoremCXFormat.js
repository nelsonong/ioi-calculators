import React from 'react';
import { connect } from 'react-redux';
import {
  updateFormat,
  updateBitDepth,
} from '../../../../actions/victoremCXActions';
import styles from './VictoremCXFormat.css';

const VictoremCXFormat = ({
  format,
  bitDepth,
  bitDepths,
  formats,
  handleChangeFormat,
  handleChangeBitDepth,
}) => {
  const formatOptions = formats.map((formatOption, i) => (
    <option key={i} value={formatOption}>{formatOption}</option>
  ));
  const bitDepthOptions = bitDepths.map((bitDepthOption, i) => (
    <option key={i} value={bitDepthOption}>{bitDepthOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output Format</legend>
      <div className={styles.label}>Link:</div>
      <select className={styles.select} value={format} onChange={handleChangeFormat}>
        {formatOptions}
      </select>

      <div className={styles.label}>Bit Depth:</div>
      <select className={styles.select} value={bitDepth} onChange={handleChangeBitDepth}>
        {bitDepthOptions}
      </select>
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
    bitDepth,
    bitDepths,
    formats,
  } = calculatorState;
  return {
    format,
    bitDepth,
    bitDepths,
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

  handleChangeBitDepth: (e) => {
    const bitDepth = Number(e.target.value);
    dispatch(updateBitDepth(cameraId, bitDepth, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXFormat);
