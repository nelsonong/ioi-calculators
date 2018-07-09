import React from 'react';
import { DVR_MODELS } from '../../constants';
import styles from './DVRModelConfiguration.css';

const DVRModel = ({ handleChangeModel, configurations, handleChangeConfiguration }) => {
    const modelOptions = DVR_MODELS.map((model, i) => <option key={i}>{model}</option>);
    const configOptions = configurations.map((configuration, i) => <option key={i}>{configuration}</option>);
    return (
        <div className={styles.root}>
            <fieldset className={styles.root}>
            <legend>Model / Configuration</legend>
                <select className={styles.select} name='model' onChange={handleChangeModel}>
                    {modelOptions}
                </select>
                <select className={styles.select} name='configuration' onChange={handleChangeConfiguration}>
                    {configOptions}
                </select>
            </fieldset>
        </div>
    );
};

export default DVRModel;