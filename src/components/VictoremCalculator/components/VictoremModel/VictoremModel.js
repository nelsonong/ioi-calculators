import React from 'react';
import { VIC_MODELS } from '../../constants';

const VictoremModel = ({ handleChangeModel }) => {
    const modelOptions = VIC_MODELS.ALL.map((model, i) => <option key={i}>{model}</option>);
    return (
        <fieldset>
        <legend>Model</legend>
            <select name='model' onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default VictoremModel;