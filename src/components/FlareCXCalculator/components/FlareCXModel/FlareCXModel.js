import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/flareCXActions';
import { MODELS } from '../../constants';
import styles from './FlareCXModel.css';

const FlareCXModel = ({ model, handleChange }) => {
    const modelOptions = MODELS.map((model, i) => <option key={i} value={model}>{model}</option>);
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
    dvrId
}) => {
    const calculatorState = !!!dvrId
        ? state.frameRateCalculators[cameraId]
        : state.storageCalculators[dvrId].cameras[cameraId];
    const { model } = calculatorState;
    return { model };
};

const mapDispatchToProps = (dispatch, {
    cameraId,
    dvrId
}) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(cameraId, model, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXModel);