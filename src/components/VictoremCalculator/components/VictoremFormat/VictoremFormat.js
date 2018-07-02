import React from 'react';
import { VIC_BIT_DEPTHS } from '../../constants';
import './VictoremFormat.css';

const VictoremFormat = ({ formats, handleChange }) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    const bitDepthOptions = VIC_BIT_DEPTHS.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    return (
        <fieldset>
        <legend>Output Format</legend>
            <div className='format-label'>Link:</div>
            <select className='format-select' name='format' onChange={handleChange}>
                {formatOptions}
            </select>

            <div className='format-label'>Bit Depth:</div>
            <select className='format-select' name='bitDepth' onChange={handleChange}>
                {bitDepthOptions}
            </select>
        </fieldset>
    );
};

export default VictoremFormat;