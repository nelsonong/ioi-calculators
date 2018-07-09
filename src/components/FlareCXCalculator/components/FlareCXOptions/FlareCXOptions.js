import React from 'react';
import './FlareCXOptions.css';
import styles from './FlareCXOptions.css';

const FlareCXOptions = ({ model, handleChange }) => {
    const subSamplingDisabled = model.startsWith('12M') || model.startsWith('48M');
    return (
        <fieldset className={styles.root}>
        <legend>Options</legend>
            <input type="checkbox" name='subSampling' disabled={subSamplingDisabled} onChange={handleChange}/>
            <div className={styles.text}>Enable sub-sampling</div>
        </fieldset>
    );
};

export default FlareCXOptions;