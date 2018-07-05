import React from 'react';
import { FLARE_LINK } from '../../constants';

const FlareModel = ({ link, models, mode, handleChangeLink, handleChangeModel }) => {
    const modelOptions = models.map((model, i) => <option key={i} value={model}>{model}</option>);
    const disableCL = mode && (link !== FLARE_LINK.CL);
    const disableCX = mode && (link === FLARE_LINK.CX);
    const disableSDI = mode && (link === FLARE_LINK.SDI);
    return (
        <fieldset>
        <legend>Model</legend>
            <select onChange={handleChangeLink}>
                <option value={FLARE_LINK.CL} disabled={disableCL}>Camera Link</option>
                <option value={FLARE_LINK.CX} disabled={disableCX}>CoaXPress</option>
                <option value={FLARE_LINK.SDI} disabled={disableSDI}>SDI</option>
            </select>
            <br />
            <select onChange={handleChangeModel}>
                {modelOptions}
            </select>
        </fieldset>
    );
};

export default FlareModel;