import React from 'react';
import { connect } from 'react-redux';
import  { updateResolution } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIResolution.css';

const FlareSDIResolution = ({
    resolution,
    resolutions,
    handleChange
}) => {
    const resolutionOptions = resolutions.map((resolution, i) => <option key={i} value={resolution}>{resolution}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Resolution</legend>
            <select className={styles.select} name='resolution' value={resolution} onChange={handleChange}>
                {resolutionOptions}
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
        resolution,
        resolutions
    } = calculatorState;
    
    return {
        resolution,
        resolutions
    };
};

const mapDispatchToProps = (dispatch, {
    cameraId,
    dvrId
}) => ({
    handleChange: (e) => {
        const resolution = e.target.value;
        dispatch(updateResolution(cameraId, resolution, dvrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIResolution);