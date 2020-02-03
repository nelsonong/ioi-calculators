import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  updateFrameRate,
  resetFrameRate,
} from '../../../../actions/volucamActions';
import styles from './VolucamFrameRate.css';

const VolucamFrameRate = ({
  frameRate,
  maxFrameRate,
  handleChangeFrameRate,
  handleResetFrameRate,
}) => {
  const customFrameRate = Number(frameRate) !== Number(maxFrameRate.toFixed(1));
  const displayCustom = cx({ [styles.displayCustom]: customFrameRate });
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Frame Rate</legend>
      <div className={styles.center}>
        <input
          type='text'
          className={`${styles.display} ${styles.displayFpsText} ${styles.rightBar}`}
          step="any"
          readOnly
          value={'FPS'}
          disabled
          onClick={handleResetFrameRate}
        />
        <input
          type="number"
          className={`${styles.display} ${styles.displayFps} ${styles.leftBar} ${styles.rightBar} ${displayCustom}`}
          value={frameRate}
          max={maxFrameRate.toFixed(1)}
          onChange={handleChangeFrameRate}
          onClick={e => e.target.select()}
        />
        <input
          type='text'
          className={`${styles.display} ${styles.displayResetText} ${styles.leftBar}`}
          step="any"
          readOnly
          value={'⭱'}
          onClick={handleResetFrameRate}
        />
        <input
          type='text'
          className={`${styles.display} ${styles.displayMaxText} ${styles.rightBar}`}
          step="any"
          readOnly
          disabled
          value={'MAX'}
        />
        <input
          type='text'
          className={`${styles.display} ${styles.displayMax} ${styles.leftBar}`}
          disabled
          value={`${maxFrameRate.toFixed(1)}`}
        />
      </div>
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    frameRate,
    maxFrameRate,
  } = calculatorState;
  return {
    frameRate,
    maxFrameRate,
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

export default connect(mapStateToProps, mapDispatchToProps)(VolucamFrameRate);
