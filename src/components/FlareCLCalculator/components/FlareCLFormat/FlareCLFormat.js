import React from 'react';
import { connect } from 'react-redux';
import { updateFormat } from '../../../../actions/flareCLActions';
import styles from './FlareCLFormat.css';

const FlareCLFormat = ({
    format,
    formats,
    handleChange
}) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Camera Link Format</legend>
        <select className={styles.select} value={format} onChange={handleChange}>
            {formatOptions}
        </select>
        </fieldset>
    );
};

const mapStateToProps = (state, {
    cameraId,
    dvrId
}) => {
    const calculatorState = !!!dvrId
        ? state.frameRateCalculators[cameraId]
        : state.storageCalculators[dvrId].cameras[cameraId];
    const {
        format,
        formats
    } = calculatorState;
    
    return {
        format,
        formats
    };
};

const mapDispatchToProps = (dispatch, {
    cameraId,
    dvrId
}) => ({
    handleChange: (e) => {
        const format = e.target.value;
        dispatch(updateFormat(cameraId, format, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCLFormat);