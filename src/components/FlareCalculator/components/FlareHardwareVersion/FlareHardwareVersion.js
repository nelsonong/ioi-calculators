import React from 'react';
import { FLARE_LINK } from '../../constants';
import './FlareHardwareVersion.css';

const FlareHardwareVersion = ({ link, model, hwversion, handleChange }) => {
    const disabled = link !== FLARE_LINK.CL || !model.startsWith('12M');
    return (
        <fieldset>
        <legend>Hardware Version</legend>
            <input type='radio' name='hwversion' value={1} checked={hwversion === 1} disabled={disabled} onChange={handleChange} />
            <div className='hardware-version-label'>1</div>
            <input type='radio' name='hwversion' value={2} checked={hwversion === 2} disabled={disabled} onChange={handleChange} />
            <div className='hardware-version-label'>2</div>
        </fieldset>
    );
};

export default FlareHardwareVersion;