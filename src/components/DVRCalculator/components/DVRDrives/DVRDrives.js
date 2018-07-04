import React from 'react';
import { DVR_DRIVES } from '../../constants';

const DVRDrives = ({ handleChangeDrive }) => {
    const driveOptions = DVR_DRIVES.map((drive, i) => <option key={i}>{drive}</option>);
    return (
        <fieldset>
        <legend>Drives</legend>
            <select name='drives' onChange={handleChangeDrive}>
                {driveOptions}
            </select>
        </fieldset>
    );
};

export default DVRDrives;