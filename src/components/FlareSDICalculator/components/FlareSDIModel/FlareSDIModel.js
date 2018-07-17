import React from 'react';
import { connect } from 'react-redux';
import { updateSDIModel } from '../../../../actions/flareSDIActions';
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

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const calculatorState = state.get(id);
    const {
        models
    } = calculatorState;
    
    return {
        models
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (e) => {
        const { id } = ownProps;
        const model = e.target.value;
        dispatch(updateSDIModel(id, model));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIModel);