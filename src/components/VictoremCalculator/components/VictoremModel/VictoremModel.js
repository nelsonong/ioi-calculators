import React from 'react';
import { VIC_MODELS } from '../../constants';
import styles from './VictoremModel.css';

const VictoremModel = ({ handleChangeModel }) => {
    const modelOptions = VIC_MODELS.ALL.map((model, i) => <option key={i}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Model</legend>
            <select className={styles.select} name='model' onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default VictoremModel;