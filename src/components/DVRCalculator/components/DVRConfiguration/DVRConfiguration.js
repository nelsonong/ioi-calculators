import React from 'react';
import { DVR_CONFIG, DVR_CL_CONFIGS, DVR_CLPLUS_CONFIGS, DVR_CX_CONFIGS, DVR_CXPLUS_CONFIGS, DVR_MODEL } from '../../constants';

const DVRConfiguration = ({ configurations, handleChangeConfiguration }) => {
    const configOptions = configurations.map((configuration, i) => <option key={i}>{configuration}</option>);
    return (
        <fieldset>
        <legend>Configuration</legend>
            <select name='configuration' onChange={handleChangeConfiguration}>
                {configOptions}
            </select>
        </fieldset>
    );
};

export default DVRConfiguration;