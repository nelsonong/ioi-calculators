import React from 'react';
import './FlareCXFormat.css';

const FlareCXFormat = ({ cxFormats, handleChange }) => {
    const bitDepthOptions = cxFormats.BitDepths.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    const linkCountOptions = cxFormats.LinkCounts.map((linkCount, i) => <option key={i} value={linkCount}>{linkCount}</option>);
    const linkSpeedOptions = cxFormats.LinkSpeeds.map((linkSpeed, i) => <option key={i} value={linkSpeed}>{linkSpeed}</option>);
    return (
        <fieldset>
        <legend>CoaXPress Format</legend>
        <div className='flare-format-left'>
            <div className='flare-format-labels'>
                <div className='flare-format-label'>Bit Depth</div>
                <div className='flare-format-label'>Links</div>
            </div>
            <div className='flare-format-selects'>
                <select className='flare-format-select' name='bitDepth' onChange={handleChange}>
                    {bitDepthOptions}
                </select>
                <select className='flare-format-select' name='linkCount' onChange={handleChange}>
                    {linkCountOptions}
                </select>
            </div>
        </div>
        <div className='flare-format-right'>
            <div className='flare-format-label'>Link Speed</div>
            <select className='flare-format-select' name='linkSpeed' onChange={handleChange}>
                {linkSpeedOptions}
            </select>
        </div>
        </fieldset>
    );
};

export default FlareCXFormat;