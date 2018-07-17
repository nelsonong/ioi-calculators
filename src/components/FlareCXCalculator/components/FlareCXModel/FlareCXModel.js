import React from 'react';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/flareCXActions';
import { MODELS } from '../../constants';
import styles from './FlareCXModel.css';

const FlareCXModel = ({ handleChange }) => {
    const modelOptions = MODELS.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Model</legend>
            <select className={styles.select} name='model' onChange={handleChange}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(id, model));
    }
});

export default connect(null, mapDispatchToProps)(FlareCXModel);