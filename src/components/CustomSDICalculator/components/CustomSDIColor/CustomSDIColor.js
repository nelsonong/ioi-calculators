import React from 'react';
import { connect } from 'react-redux';
import { updateColor } from '../../../../actions/customSDIActions';
import styles from './CustomSDIColor.css';

const CustomSDIColor = ({
  color,
  colors,
  handleChange,
}) => {
  const colorOptions = colors.map((colorOption, i) => (
    <option key={i} value={colorOption}>{colorOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Color</legend>
      <select className={styles.select} value={color} onChange={handleChange}>
        {colorOptions}
      </select>
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
    color,
    colors,
  } = calculatorState;
  return {
    color,
    colors,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const color = e.target.value;
    dispatch(updateColor(cameraId, color, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomSDIColor);
