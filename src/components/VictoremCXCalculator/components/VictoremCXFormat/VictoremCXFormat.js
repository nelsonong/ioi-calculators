import React from 'react';
import { BIT_DEPTHS } from '../../constants';
import styles from './VictoremCXFormat.css';

const VictoremCXFormat = ({ formats, handleChange }) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    const bitDepthOptions = BIT_DEPTHS.map((bitDepth, i) => <option key={i} value={bitDepth}>{bitDepth}</option>);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Output Format</legend>
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

export default VictoremCXFormat;