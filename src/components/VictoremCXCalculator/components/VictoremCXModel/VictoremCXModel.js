import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/victoremCXActions';
import { MODELS } from '../../constants';
import styles from './VictoremCXModel.css';

const VictoremCXModel = ({ sensor, handleChange }) => {
    const modelOptions = MODELS.ALL.map((model, i) => <option key={i}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Model</legend>
            <div className={styles.left}>
                <select className={styles.select} name='model' onChange={handleChange}>
                    {modelOptions}
                </select>
            </div>
            <div className={styles.right}>
                <input type='text' className={styles.display} disabled value={sensor} />
            </div>
        </fieldset>
    );
};

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
    const calculatorState = frameRateCalculators[cameraId];
    const { sensor } = calculatorState;
    return { sensor };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(cameraId, model));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremCXModel);