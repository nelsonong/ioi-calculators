import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIModel.css';

const VictoremSDIModel = ({
  models,
  handleChange,
}) => {
  const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Model</legend>
      <select className={styles.select} onChange={handleChange}>
        {modelOptions}
      </select>
    </fieldset>
  );
};

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
  const calculatorState = frameRateCalculators[cameraId];
  const { models } = calculatorState;
  return { models };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChange: (e) => {
    const model = e.target.value;
    dispatch(updateModel(cameraId, model));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIModel);
