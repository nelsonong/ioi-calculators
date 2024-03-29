import React from 'react';
import { connect } from 'react-redux';
import { updateFormat } from '../../../../actions/flareCLActions';
import styles from './FlareCLFormat.css';

const FlareCLFormat = ({
  format,
  formats,
  handleChange,
}) => {
  const formatOptions = formats.map((formatOption, i) => <option key={i}>{formatOption}</option>);
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output Format</legend>
    <select className={styles.select} value={format} onChange={handleChange}>
      {formatOptions}
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
    formats,
  } = calculatorState;
  return {
    format,
    formats,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const format = e.target.value;
    dispatch(updateFormat(cameraId, format, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLFormat);
