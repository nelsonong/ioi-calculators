import React from 'react';
import './FlareCLFormat.css';

const FlareCLFormat = ({ clFormats, handleChange }) => {
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