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
        const subSampling = e.target.checked;
        dispatch(updateSubSampling(id, subSampling, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXOptions);