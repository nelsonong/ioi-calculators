import React from 'react';

const FlareSDIFormat = ({ sdiFormats, handleChange }) => {
    const sdiFormatOptions = clFormats.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset>
        <legend>SDI Format</legend>
        <select name='format' onChange={handleChange}>
            {clFormatOptions}
        </select>
        </fieldset>
    );
};

export default FlareSDIFormat;