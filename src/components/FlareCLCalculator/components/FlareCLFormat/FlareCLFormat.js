import React from 'react';
import styles from './FlareCLFormat.css';

const FlareCLFormat = ({ formats, handleChange }) => {
    const formatOptions = formats.map((format, i) => <option key={i}>{format}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Camera Link Format</legend>
        <select className={styles.select} name='format' onChange={handleChange}>
            {formatOptions}
        </select>
        </fieldset>
    );
};

export default FlareCLFormat;