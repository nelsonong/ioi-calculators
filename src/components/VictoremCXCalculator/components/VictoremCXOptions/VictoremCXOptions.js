import React from 'react';
import { connect } from 'react-redux';
import { updateCameraOption } from '../../../../actions/victoremCXActions';
import { CAMERA_OPTION } from '../../constants';
import styles from './VictoremCXOptions.css';

const VictoremCXOptions = ({
  cameraOption,
  supports2x2Binning,
  supportsSubSampling,
  supportsVerticalBinning,
  handleChange,
}) => (
  <fieldset className={styles.root}>
  <legend className={styles.legend}>Options</legend>
    <div className={styles.center}>
      <div className={styles.left}>
        <input
          type="radio"
          className={styles.radio}
          value={CAMERA_OPTION.NONE}
          checked={cameraOption === CAMERA_OPTION.NONE}
          onChange={handleChange}
        />
        <div className={styles.label}>None</div>
        <br />
        <input
          type="radio"
          className={styles.radio}
          value={CAMERA_OPTION.SUBSAMPLING}
          checked={cameraOption === CAMERA_OPTION.SUBSAMPLING}
          disabled={!supportsSubSampling}
          onChange={handleChange}
        />
        <div className={styles.label}>Sub-Sample</div>
      </div>
      <div className={styles.right}>
        <input
          type="radio"
          className={styles.radio}
          value={CAMERA_OPTION.BIN_VERTICAL}
          checked={cameraOption === CAMERA_OPTION.BIN_VERTICAL}
          disabled={!supportsVerticalBinning}
          onChange={handleChange}
        />
        <div className={styles.label}>Vertical Bin</div>
        <br />
        <input
          type="radio"
          className={styles.radio}
          value={CAMERA_OPTION.BIN_2X2}
          checked={cameraOption === CAMERA_OPTION.BIN_2X2}
          disabled={!supports2x2Binning}
          onChange={handleChange}
        />
        <div className={styles.label}>2x2 Bin</div>
      </div>
    </div>
  </fieldset>
);

const mapStateToProps = (state, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = !dvrId
    ? state.frameRateCalculators[cameraId]
    : state.storageCalculators[dvrId].cameras[cameraId];
  const {
    cameraOption,
    supports2x2Binning,
    supportsSubSampling,
    supportsVerticalBinning,
  } = calculatorState;
  return {
    cameraOption,
    supports2x2Binning,
    supportsSubSampling,
    supportsVerticalBinning,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const cameraOption = Number(e.target.value);
    dispatch(updateCameraOption(cameraId, cameraOption, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXOptions);
