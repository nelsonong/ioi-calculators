import React from 'react';
import { MODELS } from '../../constants';
import { connect } from 'react-redux';
import { updateModel } from '../../../../actions/flareCLActions';
import styles from './FlareCLModel.css';

const FlareCLModel = ({ handleChange }) => {
    const modelOptions = MODELS.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Model</legend>
            <select className={styles.select} onChange={handleChange}>
                {modelOptions}
            </select>
        </fieldset>
    );
}

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChange: (e) => {
        const model = e.target.value;
        dispatch(updateModel(id, model));
    }
});

export default connect(null, mapDispatchToProps)(FlareCLModel);