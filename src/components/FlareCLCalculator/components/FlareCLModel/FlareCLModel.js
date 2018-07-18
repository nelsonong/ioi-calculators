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

const mapStateToProps = (state, { id, dvrId }) => {
    const calculatorState = (dvrId !== undefined) ?
        state.storageCalculators.get(dvrId).cameras.get(id) :
        state.frameRateCalculators.get(id);
    const {
        model
    } = calculatorState;
    
    return {
        model
    };
};

const mapDispatchToProps = (dispatch, { id, dvrId }) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(id, model, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLModel);