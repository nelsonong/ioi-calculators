import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  updateFrameRate,
  resetFrameRate,
} from '../../../../actions/victoremCXActions';
import styles from './VictoremCXFrameRate.css';

const VictoremCXFrameRate = ({
  frameRate,
  maxFrameRate,
  handleChangeFrameRate,
  handleResetFrameRate,
}) => {
  const customFrameRate = Number(frameRate.toFixed(2)) !== Number(maxFrameRate.toFixed(2));
  const displayCustom = cx({ [styles.displayCustom]: customFrameRate });
  return (
    <div>
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
          max={maxFrameRate.toFixed(2)}
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
          value={`${maxFrameRate.toFixed(2)}`}
        />
      </div>
    </div>
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
    frameRate,
    maxFrameRate,
  } = calculatorState;
  return {
    frameRate,
    maxFrameRate,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeFrameRate: (e) => {
    const frameRate = parseFloat(Number(e.target.value), 10);
    dispatch(updateFrameRate(cameraId, frameRate, dvrId));
  },
  handleResetFrameRate: () => {
    dispatch(resetFrameRate(cameraId, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXFrameRate);
