import React from 'react';
import { connect } from 'react-redux';
import { updateCXModel } from '../../../../actions/flareCXActions';
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (e) => {
        const { id } = ownProps;
        const model = e.target.value;
        dispatch(updateCXModel(id, model));
    }
});

export default connect(null, mapDispatchToProps)(FlareCXModel);