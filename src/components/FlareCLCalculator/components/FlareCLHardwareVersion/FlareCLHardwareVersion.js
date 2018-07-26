import React from 'react';
import { connect } from 'react-redux';
import { updateHardwareVersion } from '../../../../actions/flareCLActions';
import styles from './FlareCLHardwareVersion.css';

const FlareCLHardwareVersion = ({
  model,
  hwversion,
  handleChange,
}) => {
  const disabled = !model.startsWith('12M');
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Hardware Version</legend>
      <input type='radio' value={1} checked={hwversion === 1} disabled={disabled} onChange={handleChange} />
      <div className={styles.text}>1</div>
      <input type='radio' value={2} checked={hwversion === 2} disabled={disabled} onChange={handleChange} />
      <div className={styles.text}>2</div>
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
    model,
    hwversion,
    handleChange,
  } = calculatorState;
  return {
    model,
    hwversion,
    handleChange,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const hwversion = e.target.value;
    dispatch(updateHardwareVersion(cameraId, hwversion, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLHardwareVersion);
