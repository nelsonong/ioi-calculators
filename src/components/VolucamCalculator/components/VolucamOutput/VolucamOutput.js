import React from 'react';
import { connect } from 'react-redux';
import { updateDriveModel } from '../../../../actions/volucamActions';
import {
  DRIVES,
  FIRMWARE,
} from '../../constants';
import styles from './VolucamOutput.css';

const VolucamOutput = ({
  firmware,
  driveModel,
  dataRate,
  recordingTime,
  handleChangeDriveModel,
}) => {
  const driveModelOptions = DRIVES.map((driveModelOption, i) => (
    <option key={i}>{driveModelOption}</option>
  ));
  const outputText = `${recordingTime} ┋ ${dataRate.toFixed(2)} MB/s`;
  const compressionEnabled = firmware !== FIRMWARE.STANDARD;
  const firmwareTooltip = `Compression enabled. Recording size
    reduced by approximately a 2:1 ratio.`;
  let outputStyle;
  if (compressionEnabled) outputStyle = styles.volucamInputTop;
  else outputStyle = styles.volucamInput;
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
      {
        compressionEnabled
        && <textarea className={styles.volucamTooltip} value={firmwareTooltip} readOnly />
      }
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const {
    firmware,
    driveModel,
    dataRate,
    recordingTime,
  } = calculatorState;
  return {
    firmware,
    driveModel,
    dataRate,
    recordingTime,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChangeDriveModel: (e) => {
    const driveModel = e.target.value;
    dispatch(updateDriveModel(cameraId, driveModel));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamOutput);
