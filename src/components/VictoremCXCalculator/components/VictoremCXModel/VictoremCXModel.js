import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateModel,
  updateModelFilters,
} from '../../../../actions/victoremCXActions';
import styles from './VictoremCXModel.css';

const modelSensors = [
  'TYPE_174',
  'TYPE_183',
  'TYPE_250',
  'TYPE_252',
  'TYPE_253',
  'TYPE_255',
  'TYPE_273',
  'TYPE_287',
];

const modelColors = [
  'TYPE_COLOR',
  'TYPE_MONO',
];

const allFiltersUsed = (existingModelFilters, filters) => {
  let enabledFilters = 0;
  filters.forEach((filter) => {
    if (existingModelFilters.includes(filter)) {
      enabledFilters += 1;
    }
  });
  return (enabledFilters + 1) >= filters.length;
};

const toggleCheckBox = (cameraId, modelFilter) => {
  const documentId = `${cameraId}_${modelFilter.toLowerCase()}`;
  const checkbox = document.getElementById(documentId);
  checkbox.checked = true;
};

class VictoremCXModel extends Component {
  componentDidMount = () => {
    const {
      cameraId,
      modelFilters,
    } = this.props;
    modelSensors.forEach((modelType) => {
      if (!modelFilters.includes(modelType)) {
        toggleCheckBox(cameraId, modelType);
      }
    });
    modelColors.forEach((modelType) => {
      if (!modelFilters.includes(modelType)) {
        toggleCheckBox(cameraId, modelType);
      }
    });
  }

  render = () => {
    const {
      cameraId,
      model,
      models,
      modelFilters,
      sensor,
      handleUpdateModel,
      handleUpdateModelFilters,
    } = this.props;
    const modelOptions = models.map((modelOption, i) => (
      <option key={i} value={modelOption}>{modelOption}</option>
    ));
    return (
      <fieldset className={styles.root}>
      <legend className={styles.legend}>Model</legend>
        <div className={styles.left}>
          <div className={styles.label}>Sensors:</div>
          <br />
          <div className={styles.label}>Types:</div>
        </div>
        <div className={styles.right}>
          <input
            type='checkbox'
            id={`${cameraId}_type_174`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_174', modelFilters, e)}
          />
          <div className={styles.label}>174</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_183`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_183', modelFilters, e)}
          />
          <div className={styles.label}>183</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_250`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_250', modelFilters, e)}
          />
          <div className={styles.label}>250</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_252`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_252', modelFilters, e)}
          />
          <div className={styles.label}>252</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_253`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_253', modelFilters, e)}
          />
          <div className={styles.label}>253</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_255`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_255', modelFilters, e)}
          />
          <div className={styles.label}>255</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_273`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_273', modelFilters, e)}
          />
          <div className={styles.label}>273</div>
          <input
            type='checkbox'
            id={`${cameraId}_type_287`}
            className={styles.checkbox}
            onChange={e => handleUpdateModelFilters('TYPE_287', modelFilters, e)}
          />
          <div className={styles.label}>287</div>
          <br />
          <div className={styles.left2}>
            <input
              type='checkbox'
              id={`${cameraId}_type_color`}
              className={styles.checkbox}
              onChange={e => handleUpdateModelFilters('TYPE_COLOR', modelFilters, e)}
            />
            <div className={styles.label}>Color</div>
            <input
              type='checkbox'
              id={`${cameraId}_type_mono`}
              className={styles.checkbox}
              onChange={e => handleUpdateModelFilters('TYPE_MONO', modelFilters, e)}
            />
            <div className={styles.label}>Mono</div>
          </div>
          <div className={styles.right2}>
            <select className={styles.select} value={model} onChange={handleUpdateModel}>
              {modelOptions}
            </select>
            <input type='text' className={styles.display} disabled value={sensor} />
          </div>
        </div>
      </fieldset>
    );
  }
}

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
    modelFilters,
    sensor,
  } = calculatorState;
  return {
    cameraId,
    model,
    models,
    modelFilters,
    sensor,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleUpdateModel: (e) => {
    const model = e.target.value;
    dispatch(updateModel(cameraId, model, dvrId));
  },
  handleUpdateModelFilters: (modelFilter, modelFilters, e) => {
    const enabled = e.target.checked;
    if (enabled === false) {
      if (modelSensors.includes(modelFilter) && allFiltersUsed(modelFilters, modelSensors)) {
        toggleCheckBox(cameraId, modelFilter);
        return;
      }

      if (modelColors.includes(modelFilter) && allFiltersUsed(modelFilters, modelColors)) {
        toggleCheckBox(cameraId, modelFilter);
        return;
      }
    }

    dispatch(updateModelFilters(cameraId, modelFilter, enabled, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXModel);
