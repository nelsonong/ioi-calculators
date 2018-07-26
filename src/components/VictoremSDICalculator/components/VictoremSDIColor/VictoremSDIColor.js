import React from 'react';
import { connect } from 'react-redux';
import { updateColor } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIColor.css';

const VictoremSDIColor = ({
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

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
  const calculatorState = frameRateCalculators[cameraId];
  const {
    color,
    colors,
  } = calculatorState;
  return {
    color,
    colors,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChange: (e) => {
    const color = e.target.value;
    dispatch(updateColor(cameraId, color));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIColor);
