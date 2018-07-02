import React from 'react';
import { DVR_DRIVES } from '../../constants';

const DVRDrives = ({ handleChange }) => {
    const driveOptions = DVR_DRIVES.map((drive, i) => <option key={i}>{drive}</option>);
    return (
        <fieldset>
        <legend>Drives</legend>
            <select name='drives' onChange={handleChange}>
                {driveOptions}
            </select>
        </fieldset>
    );
};

export default DVRDrives;