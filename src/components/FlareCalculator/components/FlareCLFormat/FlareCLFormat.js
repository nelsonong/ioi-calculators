import React from 'react';
import { FLARE_MODE } from '../../constants';
import './FlareCLFormat.css';

const FlareCLFormat = ({ clFormats, mode, handleChange }) => {
    let filteredFormats = clFormats;
    if (mode === FLARE_MODE.BASE) {
        filteredFormats = clFormats.filter(clFormat => clFormat.startsWith('Base'));
    } else if (mode === FLARE_MODE.FULL) {
        filteredFormats = clFormats.filter(clFormat => !clFormat.startsWith('Base'));
    }
    const clFormatOptions = filteredFormats.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset>
        <legend>Camera Link Format</legend>
        <select name='format' onChange={handleChange}>
            {clFormatOptions}
        </select>
        </fieldset>
    );
};

export default FlareCLFormat;