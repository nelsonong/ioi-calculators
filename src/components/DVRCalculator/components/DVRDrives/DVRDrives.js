import React from 'react';
import { connect } from 'react-redux';
import { updateRaid, updateDriveModel, updateDriveAmount } from '../../../../actions/dvrActions';
import { DRIVES } from '../../constants';
import styles from './DVRDrives.css';

const DVRDrives = ({
    raid,
    driveModel,
    driveAmount,
    driveAmounts,
    handleChangeDriveModel,
    handleChangeDriveAmount,
    handleChangeRaid
}) => {
    const raidOptions = [ 0, 1, 5 ].map((raid, i) => <option key={i}>{raid}</option>);
    const driveModelOptions = DRIVES.map((driveModel, i) => <option key={i}>{driveModel}</option>);
    const driveAmountOptions = driveAmounts.map((amount, i) => <option key={i} value={amount}>{amount}</option>)
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Drives</legend>
            <div className={styles.raid}>
                <div className={styles.label}>
                    RAID:
                </div>
                <select className={styles.select} value={raid} onChange={handleChangeRaid}>
                    {raidOptions}
                </select>
            </div>
            <div className={styles.drive}>
                <div className={styles.label}>
                    Drive:
                </div>
                <select className={styles.select} value={driveModel} onChange={handleChangeDriveModel}>
                    {driveModelOptions}
                </select>
            </div>
            <div className={styles.amount}>
                <div className={styles.label}>
                    Amount:
                </div>
                <select className={styles.select} value={driveAmount} onChange={handleChangeDriveAmount}>
                    {driveAmountOptions}
                </select>
            </div>
        </fieldset>
    );
};

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
    const calculatorState = storageCalculators[dvrId];
    const {
        raid,
        driveModel,
        driveAmount,
        driveAmounts
    } = calculatorState;

    return {
        raid,
        driveModel,
        driveAmount,
        driveAmounts
    };
};

const mapDispatchToProps = (dispatch, { dvrId }) => ({
    handleChangeRaid: (e) => {
        const raid = Number(e.target.value);
        dispatch(updateRaid(dvrId, raid));
    },
    handleChangeDriveModel: (e) => {
        const driveModel = e.target.value;
        dispatch(updateDriveModel(dvrId, driveModel));
    },
    handleChangeDriveAmount: (e) => {
        const driveAmount = Number(e.target.value);
        dispatch(updateDriveAmount(dvrId, driveAmount));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRDrives);