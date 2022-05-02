import React from 'react';
import { connect } from 'react-redux';
import { updateSubSampling } from '../../../../actions/flareCXActions';
import styles from './FlareCXOptions.css';

const FlareCXOptions = ({
  model,
  subSampling,
  handleChange,
}) => {
  const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Options</legend>
      <input
        type="checkbox"
        key={Math.random()}
        className={styles.checkbox}
        disabled={subSamplingDisabled}
        defaultChecked={subSampling}
        onChange={handleChange}
      />
      <div className={styles.text}>Enable sub-sampling</div>
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
    subSampling,
  } = calculatorState;
  return {
    model,
    subSampling,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const subSampling = e.target.checked;
    dispatch(updateSubSampling(cameraId, subSampling, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXOptions);
