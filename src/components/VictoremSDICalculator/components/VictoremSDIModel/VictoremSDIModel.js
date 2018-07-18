import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIModel.css';

const VictoremSDIModel = ({ models, handleChange }) => {
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

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        models
    } = calculatorState;
    
    return {
        models
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(id, model));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIModel);