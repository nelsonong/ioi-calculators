import React from 'react';
import { DVR_CONFIGURATIONS } from '../../constants';

const DVRConfiguration = ({ handleChange }) => {
    const configOptions = DVR_CONFIGURATIONS.map((configuration, i) => <option key={i}>{configuration}</option>);
    return (
        <fieldset>
        <legend>Configuration</legend>
            <select name='configuration' onChange={handleChange}>
                {configOptions}
            </select>
        </fieldset>
    );
};

export default DVRConfiguration;