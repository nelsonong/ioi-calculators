import React from 'react';
import { SLOW_MODE_FORMATS } from '../../constants';
import styles from './FlareCLOptions.css';

const FlareCLOptions = ({ model, format, handleChange }) => {
    const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
    const slowModeDisabled = model.startsWith('12M') || !SLOW_MODE_FORMATS.includes(format);
    return (
        <fieldset className={styles.root}>
        <legend>Options</legend>
            <input type="checkbox" name='subSampling' disabled={subSamplingDisabled} onChange={handleChange}/>
            <div className={styles.text}>Enable sub-sampling</div>
            <br />
            <input type="checkbox" name='slowMode' disabled={slowModeDisabled} onChange={handleChange}/>
            <div className={styles.text}>Enabled reduced line rate mode</div>
        </fieldset>
    );
};

export default FlareCLOptions;