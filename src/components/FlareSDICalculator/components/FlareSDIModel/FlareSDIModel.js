import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIModel.css';

const FlareSDIModel = ({ models, handleChange }) => {
    const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Model</legend>
            <select className={styles.select} name='model' onChange={handleChange}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id, dvrId }) => {
    const calculatorState = (dvrId !== undefined) ?
        state.storageCalculators.get(dvrId).cameras.get(id) :
        state.frameRateCalculators.get(id);
    const {
        models
    } = calculatorState;
    
    return {
        models
    };
};

const mapDispatchToProps = (dispatch, { id, dvrId }) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(id, model, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIModel);