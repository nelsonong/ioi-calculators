import React from 'react';
import styles from './FlareSDIResolution.css';

const FlareSDIResolution = ({ resolution, resolutions, handleChange }) => {
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

export default FlareSDIResolution;