import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/volucamActions';
import styles from './VolucamModel.css';

const VolucamModel = ({
  model,
  models,
  sensor,
  handleChange,
}) => {
  const modelOptions = models.map((modelOption, i) => (
    <option key={i} value={modelOption}>{modelOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Model</legend>
      <div className={styles.left}>
      <select className={styles.select} value={model} onChange={handleChange}>
        {modelOptions}
      </select>
      </div>
      <div className={styles.right}>
        <input type='text' className={styles.display} disabled value={sensor} />
      </div>
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    model,
    models,
    sensor,
  } = calculatorState;
  return {
    model,
    models,
    sensor,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChange: (e) => {
    const model = e.target.value;
    dispatch(updateModel(cameraId, model));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamModel);
