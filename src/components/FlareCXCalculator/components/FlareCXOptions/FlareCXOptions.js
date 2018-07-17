import React from 'react';
import { connect } from 'react-redux';
import { updateCXSubSampling } from '../../../../actions/flareCXActions';
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

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const calculatorState = state.get(id);
    const {
        model
    } = calculatorState;
    
    return {
        model
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (e) => {
        const { id } = ownProps;
        const subSampling = e.target.checked;
        dispatch(updateCXSubSampling(id, subSampling));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXOptions);