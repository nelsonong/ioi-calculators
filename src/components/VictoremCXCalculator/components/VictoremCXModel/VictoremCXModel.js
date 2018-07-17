import React from 'react';
import { MODELS } from '../../constants';
import styles from './VictoremCXModel.css';

const VictoremCXModel = ({ sensor, handleChangeModel }) => {
    const modelOptions = MODELS.ALL.map((model, i) => <option key={i}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Model</legend>
            <div className={styles.left}>
                <select className={styles.select} name='model' onChange={handleChangeModel}>
                    {modelOptions}
                </select>
            </div>
            <div className={styles.right}>
                <input type='text' className={styles.display} disabled value={sensor} />
            </div>
        </fieldset>
    );
};

export default VictoremCXModel;