import React from 'react';
import { connect } from 'react-redux';
import  { updateResolution } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIResolution.css';

const VictoremSDIResolution = ({
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

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
    const calculatorState = frameRateCalculators[cameraId];
    const {
        resolution,
        resolutions
    } = calculatorState;
    
    return {
        resolution,
        resolutions
    };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
    handleChange: (e) => {
        const resolution = e.target.value;
        dispatch(updateResolution(cameraId, resolution));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIResolution);