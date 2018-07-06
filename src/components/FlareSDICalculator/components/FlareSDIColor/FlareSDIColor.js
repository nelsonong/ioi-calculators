import React from 'react';

const FlareSDIColor = ({ color, colors, handleChange }) => {
    const colorOptions = colors.map((color, i) => <option key={i} value={color}>{color}</option>);
    return (
        <fieldset>
        <legend>Color</legend>
            <select name='color' value={color} onChange={handleChange}>
                {colorOptions}
            </select>
        </fieldset>
    );
};

export default FlareSDIColor;