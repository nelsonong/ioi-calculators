import React from 'react';
import { DVR_MODELS } from '../../constants';
import './DVRModel.css';

const DVRModel = ({ handleChangeModel }) => {
    const modelOptions = DVR_MODELS.map((model, i) => <option key={i}>{model}</option>);
    return (
        <div className='dvr-model'>
            <fieldset>
            <legend>Model</legend>
                <select className='dvr-model-select' name='model' onChange={handleChangeModel}>
                    {modelOptions}
                </select>
            </fieldset>
        </div>
    );
};

export default DVRModel;