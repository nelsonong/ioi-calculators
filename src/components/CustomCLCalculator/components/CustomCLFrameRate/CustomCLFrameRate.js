import React from 'react';
import { connect } from 'react-redux';
import { updateFrameRate } from '../../../../actions/customCLActions';
import styles from './CustomCLFrameRate.css';

const CustomCLFrameRate = ({
  frameRate,
  handleChange,
}) => (
  <fieldset className={styles.root}>
  <legend className={styles.legend}>Frame Rate</legend>
    <input type="number" className={styles.display} value={frameRate} onChange={handleChange} />
  </fieldset>
);

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = storageCalculators[dvrId].cameras[cameraId];
  const { frameRate } = calculatorState;
  return { frameRate };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const frameRate = Number(e.target.value);
    dispatch(updateFrameRate(cameraId, frameRate, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCLFrameRate);
