import React from 'react';
import { connect } from 'react-redux';
import { updateOption } from '../../../../actions/ntscActions';
import { OPTION } from '../../constants';
import styles from './NTSCOptions.css';

const NTSCOptions = ({
    option,
    handleChange
}) => (
    <fieldset className={styles.root}>
    <legend className={styles.legend}></legend>
        <input
            type="radio"
            className={styles.radio}
            value={OPTION.FIELD_MODE}
            checked={option === OPTION.FIELD_MODE}
            onChange={handleChange}
        />
        <div className={styles.label}>Field Mode</div>
        <br />
        <input
            type="radio"
            className={styles.radio}
            value={OPTION.FRAME_MODE}
            checked={option === OPTION.FRAME_MODE}
            onChange={handleChange}
        />
        <div className={styles.label}>Frame Mode</div>
    </fieldset>
);

const mapStateToProps = ({ storageCalculators }, {
    cameraId,
    dvrId
}) => {
    const calculatorState = storageCalculators[dvrId].cameras[cameraId];
    const { option } = calculatorState;
    return { option };
};

const mapDispatchToProps = (dispatch, { cameraId, dvrId }) => ({
    handleChange: (e) => {
        const option = e.target.value;
        dispatch(updateOption(cameraId, option, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NTSCOptions);