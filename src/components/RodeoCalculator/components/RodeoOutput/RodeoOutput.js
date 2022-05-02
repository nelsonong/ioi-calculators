import React from 'react';
import { connect } from 'react-redux';
import { updateDriveModel } from '../../../../actions/rodeoActions';
import { DRIVES } from '../../constants';
import styles from './RodeoOutput.css';

const RodeoOutput = ({
  driveModel,
  totalDataRate,
  recordingTime,
  handleChangeDriveModel,
}) => {
  const driveModelOptions = DRIVES.map((driveModelOption, i) => (
    <option key={i}>{driveModelOption}</option>
  ));
  const outputText = `${recordingTime} ┋ ${Number(totalDataRate).toFixed(2)} MB/s`;
  const compressionEnabled = true;
  const tooltip = `Compression enabled. Recording size
    reduced by approximately a 2:1 ratio.`;
  let outputStyle;
  if (compressionEnabled) outputStyle = styles.rodeoInputTop;
  else outputStyle = styles.rodeoInput;
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Storage/Output</legend>
      <div className={styles.drive}>
        <div className={styles.label}>
          Drive:
        </div>
        <select className={styles.select} value={driveModel} onChange={handleChangeDriveModel}>
          {driveModelOptions}
        </select>
      </div>
      <input type='text' className={outputStyle} disabled={true} value={outputText} />
      <textarea className={styles.rodeoTooltip} value={tooltip} readOnly />
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
  const calculatorState = storageCalculators[dvrId];
  const {
    driveModel,
    totalDataRate,
    recordingTime,
  } = calculatorState;
  return {
    driveModel,
    totalDataRate,
    recordingTime,
  };
};

const mapDispatchToProps = (dispatch, { dvrId }) => ({
  handleChangeDriveModel: (e) => {
    const driveModel = e.target.value;
    dispatch(updateDriveModel(dvrId, driveModel));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RodeoOutput);
