import React from 'react';
import styles from './FlareCXOutput.css';

const FlareCXOutput = ({ frameRate, dataRate }) => {
    const frameRateInput = `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <fieldset className={styles.root}>
        <legend>Output</legend>
            <input type='text' className={styles.input} disabled={true} value={frameRateInput} />
        </fieldset>
    );
};

export default FlareCXOutput;