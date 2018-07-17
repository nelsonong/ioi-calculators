import React from 'react';
import { connect } from 'react-redux';
import { updateSubSampling, updateSlowMode } from '../../../../actions/flareCLActions';
import { SLOW_MODE_FORMATS } from '../../constants';
import styles from './FlareCLOptions.css';

const FlareCLOptions = ({
    model,
    format,
    handleChangeSubSampling,
    handleChangeSlowMode
}) => {
    const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
    const slowModeDisabled = model.startsWith('12M') || !SLOW_MODE_FORMATS.includes(format);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Options</legend>
            <input type="checkbox" className={styles.checkbox} disabled={subSamplingDisabled} onChange={handleChangeSubSampling}/>
            <div className={styles.text}>Enable sub-sampling</div>
            <br />
            <input type="checkbox" className={styles.checkbox} disabled={slowModeDisabled} onChange={handleChangeSlowMode}/>
            <div className={styles.text}>Enabled reduced line rate mode</div>
        </fieldset>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const calculatorState = state.get(id);
    const {
        model,
        format
    } = calculatorState;
    
    return {
        model,
        format
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;
    return {
        handleChangeSubSampling: (e) => {
            const subSampling = e.target.checked;
            dispatch(updateSubSampling(id, subSampling));
        },
        handleChangeSlowMode: (e) => {
            const { id } = ownProps;
            const slowMode = e.target.checked;
            dispatch(updateSlowMode(id, slowMode));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLOptions);