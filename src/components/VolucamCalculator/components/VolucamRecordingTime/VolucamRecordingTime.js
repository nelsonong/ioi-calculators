import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  updateFrameRate,
  resetFrameRate,
} from '../../../../actions/volucamActions';
import styles from './VolucamRecordingTime.css';

const VolucamRecordingTime = ({
  dataRate,
  frameRate,
  maxFrameRate,
  recordingTime,
  handleChangeFrameRate,
  handleResetFrameRate,
}) => {
  const customFrameRate = Number(frameRate) !== Number(maxFrameRate.toFixed(1));
  const displayCustom = cx({ [styles.displayCustom]: customFrameRate });
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output</legend>
      <div className={styles.center}>
        <input
          type="number"
          className={`${styles.display} ${styles.displayFps} ${styles.rightBar} ${displayCustom}`}
          value={frameRate}
          max={maxFrameRate.toFixed(1)}
          onChange={handleChangeFrameRate}
          onClick={e => e.target.select()}
        />
        <input
          type='text'
          className={`${styles.display} ${styles.displayFpsText} ${styles.leftBar}`}
          step="any"
          readOnly
          value={'FPS'}
          onClick={handleResetFrameRate}
          onMouseOver={(e) => { e.target.value = '⭱'; }}
          onMouseLeave={(e) => { e.target.value = 'FPS'; }}
        />
        <input
          type='text'
          className={`${styles.display} ${styles.displayDataRate}`}
          disabled
          value={`${dataRate.toFixed(2)} MB/s`}
        />
      </div>
      <input type='text' className={styles.input} disabled={true} value={recordingTime} />
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    dataRate,
    frameRate,
    maxFrameRate,
    recordingTime,
  } = calculatorState;
  return {
    dataRate,
    frameRate,
    maxFrameRate,
    recordingTime,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChangeFrameRate: (e) => {
    const frameRate = parseFloat(Number(e.target.value), 10);
    dispatch(updateFrameRate(cameraId, frameRate));
  },
  handleResetFrameRate: () => {
    dispatch(resetFrameRate(cameraId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamRecordingTime);
