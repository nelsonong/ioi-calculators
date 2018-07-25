import React from 'react';
import { connect } from 'react-redux';
import { updateModel, updateConfiguration } from '../../../../actions/dvrActions';
import { MODELS } from '../../constants';
import styles from './DVRModelConfiguration.css';

const DVRModel = ({
    model,
    configuration,
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
                <select className={styles.select} value={model} onChange={handleChangeModel}>
                    {modelOptions}
                </select>
                <select className={styles.select} value={configuration} onChange={handleChangeConfiguration}>
                    {configOptions}
                </select>
            </fieldset>
        </div>
    );
};

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
    const calculatorState = storageCalculators[dvrId];
    const {
        model,
        configuration,
        configurations
    } = calculatorState;
    
    return {
        model,
        configuration,
        configurations
    };
};

const mapDispatchToProps = (dispatch, { dvrId }) => ({
    handleChangeModel: (e) => {
        const model = e.target.value;
        dispatch(updateModel(dvrId, model));
    },
    handleChangeConfiguration: (e) => {
        const configuration = e.target.value;
        dispatch(updateConfiguration(dvrId, configuration));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRModel);