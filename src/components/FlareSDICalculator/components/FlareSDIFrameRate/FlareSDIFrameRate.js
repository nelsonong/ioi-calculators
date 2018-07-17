import React from 'react';
import { connect } from 'react-redux';
import  { updateSDIFrameRate } from '../../../../actions/flareSDIActions';
import styles from './FlareSDIFrameRate.css';

const FlareSDIFrameRate = ({
    frameRate,
    frameRates,
    handleChange
}) => {
    const frameRateOptions = frameRates.map((frameRate, i) => <option key={i} value={frameRate}>{frameRate}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Frame Rate</legend>
            <select className={styles.select} name='frameRate' value={frameRate} onChange={handleChange}>
                {frameRateOptions}
            </select>
        </fieldset>
    );
};

const mapStateToProps = (state, { id }) => {
    const calculatorState = state.get(id);
    const {
        frameRate,
        frameRates
    } = calculatorState;
    
    return {
        frameRate,
        frameRates
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const frameRate = Number(e.target.value);
        dispatch(updateSDIFrameRate(id, frameRate));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareSDIFrameRate);