import React from 'react';
import styles from './FlareSDIColor.css';

const FlareSDIColor = ({ color, colors, handleChange }) => {
    const colorOptions = colors.map((color, i) => <option key={i} value={color}>{color}</option>);
    return (
        <fieldset className={styles.root}>
        <legend>Color</legend>
            <select className={styles.select} name='color' value={color} onChange={handleChange}>
                {colorOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIColor;