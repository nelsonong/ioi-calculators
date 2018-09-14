import React from 'react';
import { connect } from 'react-redux';
import { MODELS } from '../../constants';
import {
  updateModel,
  updateHardwareVersion,
} from '../../../../actions/flareCLActions';
import styles from './FlareCLModel.css';

const FlareCLModel = ({
  model,
  hwversion,
  handleChangeModel,
  handleChangeHardwareVersion,
}) => {
  const modelOptions = MODELS.map((modelOption, i) => (
    <option key={i} value={modelOption}>{modelOption}</option>
  ));
  const hwVersionOptions = [1, 2].map((hwVersionOption, i) => (
    <option key={i} value={hwVersionOption}>{hwVersionOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Model</legend>
      <select className={styles.select} value={model} onChange={handleChangeModel}>
        {modelOptions}
      </select>
      <br />
      <div className={styles.label}>
        Hardware Version:
      </div>
      <select
        className={styles.select}
        value={hwversion}
        disabled={!model.startsWith('12M')}
        onChange={handleChangeHardwareVersion}
      >
        {hwVersionOptions}
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
    hwversion,
  } = calculatorState;
  return {
    model,
    hwversion,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeModel: (e) => {
    const model = e.target.value;
    dispatch(updateModel(cameraId, model, dvrId));
  },

  handleChangeHardwareVersion: (e) => {
    const hwversion = e.target.value;
    dispatch(updateHardwareVersion(cameraId, hwversion, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLModel);
