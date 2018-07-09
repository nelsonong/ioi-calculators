import React from 'react';
import { MODE } from '../../../DVRCalculator/constants/dvr-modes';;
import './FlareCXFormat.css';

const renderLinkCountOptions = (formats, mode) => {
    if (!mode) {
        return formats.LinkCounts.map((linkCount, i) => <option key={i} value={linkCount}>{linkCount}</option>);
    } else {
        let linkCount;
        switch (mode) {
            case MODE.SINGLE:
                linkCount = 1;
                break;
            case MODE.DUAL:
                linkCount = 2;
                break;
            case MODE.QUAD:
                linkCount = 4;
        }
        return <option value={linkCount}>{linkCount}</option>;
    }
};

const FlareCXFormat = ({ formats, mode, handleChange }) => {
    const bitDepthOptions = formats.BitDepths.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    const linkSpeedOptions = formats.LinkSpeeds.map((linkSpeed, i) => <option key={i} value={linkSpeed}>{linkSpeed}</option>);
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
                    {renderLinkCountOptions(formats, mode)}
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