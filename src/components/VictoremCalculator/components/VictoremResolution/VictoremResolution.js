import React from 'react';
import { RESOLUTIONS, NAN_RESOLUTIONS, OPTION } from '../../constants';
import styles from './VictoremResolution.css';

const VictoremResolution = ({
    resolutionPreset,
    width,
    height,
    cameraOption,
    handleChangePreset,
    handleChangeResolution
}) => {
    const subSamplingSelected = (cameraOption === OPTION.SUBSAMPLING);
    const resolutionPresetOptions = RESOLUTIONS.map((preset, i) => {
        if (!NAN_RESOLUTIONS.includes(preset)) {
            preset = `${preset[0]}x${preset[1]}`;
        }
        return <option key={i} value={preset}>{preset}</option>;
    });
    return (
        <fieldset className={styles.root}>
        <legend>Resolution</legend>
            <div className={styles.labels}>
                <div className={styles.label}>Presets:</div>
                <div className={styles.label}>W x H:</div>
            </div>
            <div className={styles.controls}>
                <select className={styles.presets} value={resolutionPreset} disabled={subSamplingSelected} onChange={handleChangePreset}>
                    {resolutionPresetOptions}
                </select>
                <br />
                <input type="number" className={styles.wxh} name='width' value={width} min='1' max='9999' disabled={subSamplingSelected} onChange={handleChangeResolution} />
                <input type="number" className={styles.wxh} name='height' value={height} min='1' max='9999' disabled={subSamplingSelected} onChange={handleChangeResolution} />
            </div>
        </fieldset>
    );
};

export default VictoremResolution;