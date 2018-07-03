import React from 'react';
import { FLARE_MODE } from '../../constants';
import './FlareCLFormat.css';

const FlareCLFormat = ({ clFormats, mode, handleChange }) => {
    const clFormatOptions = clFormats.map((format, i) => <option key={i}>{format}</option>);
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