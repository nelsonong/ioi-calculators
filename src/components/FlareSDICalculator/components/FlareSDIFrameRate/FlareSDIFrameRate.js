import React from 'react';
import styles from './FlareSDIFrameRate.css';

const FlareSDIFrameRate = ({ frameRate, frameRates, handleChange }) => {
    const frameRateOptions = frameRates.map((frameRate, i) => <option key={i} value={frameRate}>{frameRate}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Frame Rate</legend>
            <select className={styles.select} name='frameRate' value={frameRate} onChange={handleChange}>
                {frameRateOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIFrameRate;