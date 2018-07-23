import React from 'react';
import { MODELS } from '../../constants';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/flareCLActions';
import styles from './FlareCLModel.css';

const FlareCLModel = ({ model, handleChange }) => {
    const modelOptions = MODELS.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Model</legend>
            <select className={styles.select} value={model} onChange={handleChange}>
                {modelOptions}
            </select>
        </fieldset>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLModel);