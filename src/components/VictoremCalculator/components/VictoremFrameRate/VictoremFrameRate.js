import React from 'react';
import styles from './VictoremFrameRate.css';

const VictoremFrameRate = ({ frameRate }) => (
    <fieldset className={styles.root}>
    <legend>Frame Rate</legend>
        <input type='text' className={styles.input} disabled={true} value={frameRate} />
    </fieldset>
);

export default VictoremFrameRate;