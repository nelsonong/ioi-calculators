import React from 'react';
import { connect } from 'react-redux';
import { updateSubSampling } from '../../../../actions/flareCXActions';
import styles from './FlareCXOptions.css';

const FlareCXOptions = ({ model, handleChange }) => {
    const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Options</legend>
            <input type="checkbox" className={styles.checkbox} disabled={subSamplingDisabled} onChange={handleChange}/>
            <div className={styles.text}>Enable sub-sampling</div>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        model
    } = calculatorState;
    
    return {
        model
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const subSampling = e.target.checked;
        dispatch(updateSubSampling(id, subSampling));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXOptions);