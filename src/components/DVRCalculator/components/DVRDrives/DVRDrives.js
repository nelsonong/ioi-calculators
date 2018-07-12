import React from 'react';
import { DRIVES } from '../../constants';
import styles from './DVRDrives.css';

const DVRDrives = ({ totalCapacity, handleChangeDriveAmount, handleChangeDrive }) => {
    const driveAmountOptions = [ 1, 2, 4, 6 ].map((amount, i) => <option key={i} value={amount}>{amount}</option>)
    const driveOptions = DRIVES.map((drive, i) => <option key={i}>{drive}</option>);
    const totalCapacityText = `${totalCapacity} GB`;
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Drives</legend>
            <div className={styles.drive}>
                <div className={styles.label}>
                    Drive:
                </div>
                <select className={styles.select} onChange={handleChangeDrive}>
                    {driveOptions}
                </select>
            </div>
            <div className={styles.amount}>
                <div className={styles.label}>
                    Amount:
                </div>
                <select className={styles.select} onChange={handleChangeDriveAmount}>
                    {driveAmountOptions}
                </select>
            </div>
            <input type='text' className={styles.totalCapacity} disabled value={totalCapacityText} />
        </fieldset>
    );
};

export default DVRDrives;