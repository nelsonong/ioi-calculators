import React from 'react';
import styles from './FlareCLOutput.css';

const FlareCLOutput = ({ frameRate, dataRate, error }) => {
    const outputText = error ? 'N/A' : `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Output</legend>
            <input type='text' className={styles.input} disabled={true} value={outputText} />
        </fieldset>
    );
};

export default FlareCLOutput;