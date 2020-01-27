import React from 'react';
import { connect } from 'react-redux';
import {
  updateRaid,
  updateDriveModel,
  updateDriveAmount,
} from '../../../../actions/dvrActions';
import { DRIVES } from '../../constants';
import styles from './DVRDrives.css';

const DVRDrives = ({
  raid,
  driveModel,
  driveAmount,
  driveAmounts,
  handleChangeDriveModel,
  handleChangeDriveAmount,
  handleChangeRaid,
  driveTooltip,
}) => {
  const raidOptions = [0, 1].map((raidOption, i) => <option key={i}>{raidOption}</option>);
  const driveModelOptions = DRIVES.map((driveModelOption, i) => (
    <option key={i}>{driveModelOption}</option>
  ));
  const driveAmountOptions = driveAmounts.map((amountOption, i) => (
    <option key={i} value={amountOption}>{amountOption}</option>
  ));
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
      {
        driveTooltip !== ''
        && <div className={styles.tooltip}>
          {driveTooltip}
          <br />
          {`For fewer drives, contact IO Industries or complete the 
          calculations in the DVR user's manuals to confirm the DVR will support recording 
          your camera sources with no dropped frames.`}
        </div>
      }
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
  const calculatorState = storageCalculators[dvrId];
  const {
    raid,
    driveModel,
    driveAmount,
    driveAmounts,
    driveTooltip,
  } = calculatorState;
  return {
    raid,
    driveModel,
    driveAmount,
    driveAmounts,
    driveTooltip,
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRDrives);
