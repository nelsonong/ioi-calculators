import React from 'react';
import { connect } from 'react-redux';
import { updateFormat } from '../../../../actions/ntscActions';
import styles from './NTSCFormat.css';

const NTSCFormat = ({
  format,
  handleChange,
}) => (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Format</legend>
      <select className={styles.select} value={format} onChange={handleChange}>
        <option value={format}>{format}</option>
      </select>
    </fieldset>
);

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = storageCalculators[dvrId].cameras[cameraId];
  const { format } = calculatorState;
  return { format };
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

export default connect(mapStateToProps, mapDispatchToProps)(NTSCFormat);
