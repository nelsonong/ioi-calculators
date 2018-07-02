import React from 'react';
import { FLARE_LINK } from '../../constants';

const FlareModel = ({ models, handleChangeLink, handleChangeModel }) => {
    const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
    return (
        <fieldset>
        <legend>Model</legend>
            <select onChange={handleChangeLink}>
                <option value={FLARE_LINK.CL}>Camera Link</option>
                <option value={FLARE_LINK.CX}>CoaXPress</option>
            </select>
            <br />
            <select onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default FlareModel;