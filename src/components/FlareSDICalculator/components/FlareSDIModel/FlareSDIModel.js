import React from 'react';
import styles from './FlareSDIModel.css';

const FlareSDIModel = ({ models, handleChange }) => {
    const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Model</legend>
            <select className={styles.select} name='model' onChange={handleChange}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIModel;