import React from 'react';
import { MODE } from '../../../DVRCalculator/constants/dvr-modes';;
import styles from './FlareCXFormat.css';

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
        <fieldset className={styles.root}>
        <legend>CoaXPress Format</legend>
        <div className={styles.left}>
            <div className={styles.labels}>
                <div className={styles.label}>Bit Depth:</div>
                <div className={styles.label}>Links:</div>
            </div>
            <div className={styles.selects}>
                <select className={styles.select} name='bitDepth' onChange={handleChange}>
                    {bitDepthOptions}
                </select>
                <select className={styles.select} name='linkCount' onChange={handleChange}>
                    {renderLinkCountOptions(formats, mode)}
                </select>
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.label}>Speed:</div>
            <select className={styles.select} name='linkSpeed' onChange={handleChange}>
                {linkSpeedOptions}
            </select>
        </div>
        </fieldset>
    );
};

export default FlareCXFormat;