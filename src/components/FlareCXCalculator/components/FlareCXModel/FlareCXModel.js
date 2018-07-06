import React from 'react';
import { MODELS } from '../../constants';

const FlareCXModel = ({ handleChangeModel }) => {
    const modelOptions = MODELS.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset>
        <legend>Model</legend>
            <select name='model' onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default FlareCXModel;