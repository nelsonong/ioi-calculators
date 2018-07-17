import React from 'react';
import { connect } from 'react-redux';
import  { updateSDIResolution } from '../../../../actions/flareSDIActions';
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

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        resolution,
        resolutions
    } = calculatorState;
    
    return {
        resolution,
        resolutions
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const resolution = e.target.value;
        dispatch(updateSDIResolution(id, resolution));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIResolution);