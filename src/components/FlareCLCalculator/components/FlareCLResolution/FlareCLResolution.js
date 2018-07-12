import React from 'react';
import { NAN_RESOLUTIONS, RESOLUTIONS } from '../../constants';
import styles from './FlareCLResolution.css';

const FlareCLResolution = ({
    resolutionPreset,
    width,
    height,
    handleChangePreset,
    handleChangeResolution
}) => {
    const resolutionPresetOptions = RESOLUTIONS.map((preset, i) => {
        if (!NAN_RESOLUTIONS.includes(preset)) {
            preset = `${preset[0]}x${preset[1]}`;
        }
        return <option key={i} value={preset}>{preset}</option>;
    });
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Resolution</legend>
            <div className={styles.left}>
                <div className={styles.label}>Presets:</div>
                <div className={styles.label}>W x H:</div>
            </div>
            <div className={styles.right}>
                <select className={styles.presets} value={resolutionPreset} onChange={handleChangePreset}>
                    {resolutionPresetOptions}
                </select>
                <br />
                <input type="number" className={styles.wxh} name='width' value={width} onChange={handleChangeResolution} />
                <input type="number" className={styles.wxh} name='height' value={height} onChange={handleChangeResolution} />
            </div>
        </fieldset>
    );
};

export default FlareCLResolution;