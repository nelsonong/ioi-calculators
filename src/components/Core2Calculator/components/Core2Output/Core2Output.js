import React from 'react';
import { connect } from 'react-redux';
import {
  updateRaid,
  updateDriveModel,
  updateDriveAmount,
} from '../../../../actions/core2Actions';
import { DRIVES } from '../../constants';
import styles from './Core2Output.css';

const Core2Output = ({
  raid,
  driveModel,
  driveAmount,
  driveAmounts,
  handleChangeDriveModel,
  handleChangeDriveAmount,
  handleChangeRaid,
  driveTooltip,
  dataRateTooltip,
  totalDataRate,
  totalCapacity,
  recordingTime,
}) => {
  const raidOptions = [0, 1].map((raidOption, i) => <option key={i}>{raidOption}</option>);
  const driveModelOptions = DRIVES.map((driveModelOption, i) => (
    <option key={i}>{driveModelOption}</option>
  ));
  const driveAmountOptions = driveAmounts.map((amountOption, i) => (
    <option key={i} value={amountOption}>✖{amountOption}</option>
  ));
  const outputText = `${recordingTime} ┋ ${Number(totalDataRate).toFixed(2)} MB/s`;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Storage/Output</legend>
      <div className={styles.drive}>
        <div className={styles.label}>
          Drive:
        </div>
        <select className={styles.driveSelect} value={driveModel} onChange={handleChangeDriveModel}>
          {driveModelOptions}
        </select>
        <select className={styles.select} value={driveAmount} onChange={handleChangeDriveAmount}>
          {driveAmountOptions}
        </select>
      </div>
      <div className={styles.raid}>
        <div className={styles.label}>
          RAID:
        </div>
        <select className={styles.select} value={raid} onChange={handleChangeRaid}>
          {raidOptions}
        </select>
      </div>
      <input type='text' className={styles.display} disabled value={`${totalCapacity.toFixed(1)} GB`} />
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
      <div className={styles.center}>
        <input type='text' className={styles.input} disabled={true} value={outputText} />
      </div>
      {
        totalDataRate !== 0 && dataRateTooltip !== ''
        && <div className={styles.tooltip}>
          {dataRateTooltip}
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
    dataRateTooltip,
    totalDataRate,
    totalCapacity,
    recordingTime,
  } = calculatorState;
  return {
    raid,
    driveModel,
    driveAmount,
    driveAmounts,
    driveTooltip,
    dataRateTooltip,
    totalDataRate,
    totalCapacity,
    recordingTime,
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

export default connect(mapStateToProps, mapDispatchToProps)(Core2Output);
