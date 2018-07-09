import React from 'react';
import styles from './FlareSDIOutput.css';

const FlareSDIOutput = ({ frameRate, dataRate }) => {
    const frameRateInput = `${frameRate} FPS / ${dataRate} MB/s`;
    return (
        <fieldset className={styles.root}>
        <legend>Output</legend>
            <input type='text' className={styles.input} disabled={true} value={frameRateInput} />
        </fieldset>
    );
};

export default FlareSDIOutput;