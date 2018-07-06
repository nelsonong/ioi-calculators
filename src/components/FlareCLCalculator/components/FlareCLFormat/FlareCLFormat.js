import React from 'react';
import './FlareCLFormat.css';

const FlareCLFormat = ({ formats, handleChange }) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset>
        <legend>Camera Link Format</legend>
        <select name='format' onChange={handleChange}>
            {formatOptions}
        </select>
        </fieldset>
    );
};

export default FlareCLFormat;