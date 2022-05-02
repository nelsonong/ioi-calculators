import React from 'react';
import { connect } from 'react-redux';
import {
  updateSubSampling,
  updateSlowMode,
} from '../../../../actions/flareCLActions';
import { SLOW_MODE_FORMATS } from '../../constants';
import styles from './FlareCLOptions.css';

const FlareCLOptions = ({
  model,
  format,
  subSampling,
  slowMode,
  handleChangeSubSampling,
  handleChangeSlowMode,
}) => {
  const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
  const slowModeDisabled = model.startsWith('12M') || !SLOW_MODE_FORMATS.includes(format);
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Options</legend>
        <input
          type="checkbox"
          key={Math.random()}
          className={styles.checkbox}
          disabled={subSamplingDisabled}
          defaultChecked={subSampling}
          onChange={handleChangeSubSampling}
        />
        <div className={styles.text}>Enable sub-sampling</div>
        <br />
        <input
          type="checkbox"
          key={Math.random()}
          className={styles.checkbox}
          disabled={slowModeDisabled}
          defaultChecked={slowMode}
          onChange={handleChangeSlowMode}
        />
        <div className={styles.text}>Enabled reduced line rate mode</div>
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
    format,
    subSampling,
    slowMode,
  } = calculatorState;
  return {
    model,
    format,
    subSampling,
    slowMode,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeSubSampling: (e) => {
    const subSampling = e.target.checked;
    dispatch(updateSubSampling(cameraId, subSampling, dvrId));
  },

  handleChangeSlowMode: (e) => {
    const slowMode = e.target.checked;
    dispatch(updateSlowMode(cameraId, slowMode, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLOptions);
