import React from 'react';
import { MODELS } from '../../constants';
import { connect } from 'react-redux';
import { updateCLModel } from '../../../../actions/flareCLActions';
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (e) => {
        const { id } = ownProps;
        const model = e.target.value;
        dispatch(updateCLModel(id, model));
    }
});

export default connect(null, mapDispatchToProps)(FlareCLModel);