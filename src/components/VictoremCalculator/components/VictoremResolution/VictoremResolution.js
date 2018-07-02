import React from 'react';
import { VIC_RESOLUTIONS, VIC_NAN_RESOLUTIONS, VIC_OPTION } from '../../constants';
import './VictoremResolution.css';

const VictoremResolution = ({
    resolutionPreset,
    width,
    height,
    cameraOption,
    handleChangePreset,
    handleChangeResolution
}) => {
    const subSamplingSelected = (cameraOption === VIC_OPTION.SUBSAMPLING);
    const resolutionPresetOptions = VIC_RESOLUTIONS.map((preset, i) => {
        if (!VIC_NAN_RESOLUTIONS.includes(preset)) {
            preset = `${preset[0]}x${preset[1]}`;
        }
        return <option key={i} value={preset}>{preset}</option>;
    });
    return (
        <fieldset>
        <legend>Resolution</legend>
            <div className='resolution-labels'>
                <div className='resolution-label'>Presets:</div>
                <div className='resolution-label'>W x H:</div>
            </div>
            <div className='resolution-controls'>
                <select className='.resolution-presets' value={resolutionPreset} disabled={subSamplingSelected} onChange={handleChangePreset}>
                    {resolutionPresetOptions}
                </select>
                <br />
                <input type="number" className='resolution-wxh' name='width' value={width} min='1' max='9999' disabled={subSamplingSelected} onChange={handleChangeResolution} />
                <input type="number" className='resolution-wxh' name='height' value={height} min='1' max='9999' disabled={subSamplingSelected} onChange={handleChangeResolution} />
            </div>
        </fieldset>
    );
};

export default VictoremResolution;