import React from 'react';
import { connect } from 'react-redux';
import { updateModel, updateConfiguration } from '../../../../actions/dvrActions';
import { MODELS } from '../../constants';
import styles from './DVRModelConfiguration.css';

const DVRModel = ({
    configurations,
    handleChangeModel,
    handleChangeConfiguration
}) => {
    const modelOptions = MODELS.map((model, i) => <option key={i}>{model}</option>);
    const configOptions = configurations.map((configuration, i) => <option key={i}>{configuration}</option>);
    return (
        <div>
            <fieldset className={styles.root}>
            <legend className={styles.legend}>Model / Configuration</legend>
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

const mapStateToProps = ({ storageCalculators }, { id }) => {
    const calculatorState = storageCalculators.get(id);
    const { configurations } = calculatorState;
    return {
        configurations
    };
};

const mapDispatchToProps = (dispatch, { id }) => ({
    handleChangeModel: (e) => {
        const model = e.target.value;
        dispatch(updateModel(id, model));
    },
    handleChangeConfiguration: (e) => {
        const configuration = e.target.value;
        dispatch(updateConfiguration(id, configuration));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRModel);