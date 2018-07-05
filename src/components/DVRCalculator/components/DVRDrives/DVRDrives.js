import React from 'react';
import { DVR_DRIVES } from '../../constants';
import './DVRDrives.css';

const DVRDrives = ({ totalCapacity, handleChangeDriveAmount, handleChangeDrive }) => {
    const driveAmountOptions = [ 1, 2, 4, 6 ].map((amount, i) => <option key={i} value={amount}>{amount}</option>)
    const driveOptions = DVR_DRIVES.map((drive, i) => <option key={i}>{drive}</option>);
    const totalCapacityText = `${totalCapacity} GB`;
    return (
        <fieldset>
        <legend>Drives</legend>
            <div className='dvr-drives-drive'>
                <div className='dvr-drives-label'>
                    Drive:
                </div>
                <select className='dvr-drives-select' onChange={handleChangeDrive}>
                    {driveOptions}
                </select>
            </div>
            <div className='dvr-drives-amount'>
                <div className='dvr-drives-label'>
                    Amount:
                </div>
                <select className='dvr-drives-select' onChange={handleChangeDriveAmount}>
                    {driveAmountOptions}
                </select>
            </div>
            <input type='text' className='dvr-drives-total-capacity' disabled value={totalCapacityText} />
        </fieldset>
    );
};

export default DVRDrives;