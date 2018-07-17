import React from 'react';
import { connect } from 'react-redux';
import { updateHardwareVersion } from '../../../../actions/flareCLActions';
import styles from './FlareCLHardwareVersion.css';

const FlareCLHardwareVersion = ({
    model,
    hwversion,
    handleChange
}) => {
    const disabled = !model.startsWith('12M');
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Hardware Version</legend>
            <input type='radio' name='hwversion' value={1} checked={hwversion === 1} disabled={disabled} onChange={handleChange} />
            <div className={styles.text}>1</div>
            <input type='radio' name='hwversion' value={2} checked={hwversion === 2} disabled={disabled} onChange={handleChange} />
            <div className={styles.text}>2</div>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
            model,
            hwversion,
            handleChange
    } = calculatorState;

    return {
        model,
        hwversion,
        handleChange
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const hwversion = e.target.value;
        dispatch(updateHardwareVersion(id, hwversion));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLHardwareVersion);