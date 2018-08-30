import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/victoremCXActions';
import styles from './VictoremCXModel.css';

const VictoremCXModel = ({
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
        <div className={styles.label}>Sensors:</div>
        <br />
        <div className={styles.label}>Type:</div>
      </div>
      <div className={styles.right}>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>183</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>250</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>252</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>253</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>255</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>273</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>287</div>
        <br />
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>Color</div>
        <input type='checkbox' className={styles.checkbox} checked />
        <div className={styles.label}>Mono</div>
      </div>
      <br />
      <div className={styles.center}>
        <select className={styles.select} value={model} onChange={handleChange}>
          {modelOptions}
        </select>
        <input type='text' className={styles.display} disabled value={sensor} />
      </div>
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
    models,
    sensor,
  } = calculatorState;
  return {
    model,
    models,
    sensor,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const model = e.target.value;
    dispatch(updateModel(cameraId, model, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXModel);
