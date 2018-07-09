import React from 'react';
import { VIC_BIT_DEPTHS } from '../../constants';
import styles from './VictoremFormat.css';

const VictoremFormat = ({ formats, handleChange }) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    const bitDepthOptions = VIC_BIT_DEPTHS.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Output Format</legend>
            <div className={styles.label}>Link:</div>
            <select className={styles.select} name='format' onChange={handleChange}>
                {formatOptions}
            </select>

            <div className={styles.label}>Bit Depth:</div>
            <select className={styles.select} name='bitDepth' onChange={handleChange}>
                {bitDepthOptions}
            </select>
        </fieldset>
    );
};

export default VictoremFormat;