import React from 'react';
import styles from './FlareCLHardwareVersion.css';

const FlareCLHardwareVersion = ({ model, hwversion, handleChange }) => {
    const disabled = !model.startsWith('12M');
    return (
        <fieldset className={styles.root}>
        <legend>Hardware Version</legend>
            <input type='radio' name='hwversion' value={1} checked={hwversion === 1} disabled={disabled} onChange={handleChange} />
            <div className={styles.text}>1</div>
            <input type='radio' name='hwversion' value={2} checked={hwversion === 2} disabled={disabled} onChange={handleChange} />
            <div className={styles.text}>2</div>
        </fieldset>
    );
};

export default FlareCLHardwareVersion;