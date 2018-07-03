import React from 'react';
import { DVR_MODELS } from '../../constants';

const DVRModel = ({ handleChangeModel }) => {
    const modelOptions = DVR_MODELS.map((model, i) => <option key={i}>{model}</option>);
    return (
        <fieldset>
        <legend>Model</legend>
            <select name='model' onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default DVRModel;