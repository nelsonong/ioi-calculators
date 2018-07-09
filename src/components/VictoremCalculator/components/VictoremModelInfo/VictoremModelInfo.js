import React from 'react';
import styles from './VictoremModelInfo.css';

const VictoremModelInfo = ({ sensor, maxWidth, maxHeight }) => {
    const maxResolutionText = `${maxWidth} x ${maxHeight}`;
    return (
        <fieldset className={styles.root}>
        <legend>Model Information</legend>
            <div className={styles.labels}>
                <div className={styles.label}>Sensor:</div>
                <div className={styles.label}>Max Resolution:</div>
            </div>
            <div className={styles.inputs}>
                <input type='text' className={styles.input} disabled value={sensor} />
                <br />
                <input type='text' className={styles.input} disabled value={maxResolutionText}/>
            </div>
        </fieldset>
    );
};

export default VictoremModelInfo;