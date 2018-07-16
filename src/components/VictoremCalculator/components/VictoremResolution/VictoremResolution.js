import React from 'react';
import { RESOLUTIONS, NAN_RESOLUTIONS, OPTION } from '../../constants';
import styles from './VictoremResolution.css';

const VictoremResolution = ({
    resolutionPreset,
    width,
    widthStep,
    maxWidth,
    height,
    heightStep,
    maxHeight,
    resolutionTooltip,
    cameraOption,
    handleChangePreset,
    handleChangeWidth,
    handleChangeHeight
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
        <legend className={styles.legend}>Resolution</legend>
            <div className={styles.left}>
                <div className={styles.label}>Presets:</div>
                <div className={styles.label}>W x H:</div>
            </div>
            <div className={styles.right}>
                <select className={styles.select} value={resolutionPreset} disabled={subSamplingSelected} onChange={handleChangePreset}>
                    {resolutionPresetOptions}
                </select>
                <br />
                <input type="number" className={styles.wxh} name='width' step={widthStep} value={width} min='16' max={maxWidth} disabled={subSamplingSelected} onChange={handleChangeWidth} />
                <input type="number" className={styles.wxh} name='height' step={heightStep} value={height} min='4' max={maxHeight} disabled={subSamplingSelected} onChange={handleChangeHeight} />
            </div>
            {
                resolutionTooltip !== '' &&
                <div className={styles.tooltip}>
                    {resolutionTooltip}
                </div>
            }
        </fieldset>
    );
};

export default VictoremResolution;