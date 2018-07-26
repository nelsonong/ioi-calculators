import React from 'react';
import { connect } from 'react-redux';
import { updateInput } from '../../../../actions/ntscActions';
import { INPUTS } from '../../constants';
import styles from './NTSCInput.css';

const NTSCInput = ({
  input,
  handleChange,
}) => {
  const inputOptions = INPUTS.map((inputOption, i) => (
    <option key={i} value={inputOption}>{inputOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Input</legend>
      <select className={styles.select} value={input} onChange={handleChange}>
        {inputOptions}
      </select>
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = storageCalculators[dvrId].cameras[cameraId];
  const { input } = calculatorState;
  return { input };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const input = e.target.value;
    dispatch(updateInput(cameraId, input, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NTSCInput);
