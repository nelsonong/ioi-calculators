import React from 'react';
import { MODELS } from '../../constants';
import styles from './FlareCLModel.css';

const FlareCLModel = ({ handleChangeModel }) => {
    const modelOptions = MODELS.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Model</legend>
            <select className={styles.select} onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default FlareCLModel;