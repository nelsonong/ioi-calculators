import React from 'react';
import { connect } from 'react-redux';
import { updateColor } from '../../../../actions/ntscActions';
import styles from './NTSCColor.css';

const NTSCColor = ({
    color,
    handleChange
}) => {
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Format</legend>
            <select className={styles.select} value={color} onChange={handleChange}>
                <option value={color}>{color}</option>
            </select>
        </fieldset>
    );
};

const mapStateToProps = ({ storageCalculators }, {
    cameraId,
    dvrId
}) => {
    const calculatorState = storageCalculators[dvrId].cameras[cameraId];
    const { color } = calculatorState;
    return { color };
};

const mapDispatchToProps = (dispatch, { cameraId, dvrId }) => ({
    handleChange: (e) => {
        const color = e.target.value;
        dispatch(updateColor(cameraId, color, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NTSCColor);