import React from 'react';
import { DVR_MODELS } from '../../constants';
import './DVRModelConfiguration.css';

const DVRModel = ({ handleChangeModel, configurations, handleChangeConfiguration }) => {
    const modelOptions = DVR_MODELS.map((model, i) => <option key={i}>{model}</option>);
    const configOptions = configurations.map((configuration, i) => <option key={i}>{configuration}</option>);
    return (
        <div className='dvr-model-configuration'>
            <fieldset>
            <legend>Model / Configuration</legend>
                <select className='dvr-model-configuration-select' name='model' onChange={handleChangeModel}>
                    {modelOptions}
                </select>
                <select className='dvr-model-configuration-select' name='configuration' onChange={handleChangeConfiguration}>
                    {configOptions}
                </select>
            </fieldset>
        </div>
    );
};

export default DVRModel;