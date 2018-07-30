import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIModel.css';

const VictoremSDIModel = ({
  model,
  models,
  handleChange,
}) => {
  const modelOptions = models.map((modelOption, i) => (
    <option key={i} value={modelOption}>{modelOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Model</legend>
      <select className={styles.select} value={model} onChange={handleChange}>
        {modelOptions}
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
    model,
    models,
  } = calculatorState;
  return {
    model,
    models,
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

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIModel);
