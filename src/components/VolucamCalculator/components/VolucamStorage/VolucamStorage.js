import React from 'react';
import { connect } from 'react-redux';
import { updateDriveModel } from '../../../../actions/volucamActions';
import { DRIVES } from '../../constants';
import styles from './VolucamStorage.css';

const VolucamStorage = ({
  driveModel,
  handleChangeDriveModel,
}) => {
  const driveModelOptions = DRIVES.map((driveModelOption, i) => (
    <option key={i}>{driveModelOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Storage</legend>
      <div className={styles.drive}>
        <div className={styles.label}>
          Drive:
        </div>
        <select className={styles.select} value={driveModel} onChange={handleChangeDriveModel}>
          {driveModelOptions}
        </select>
      </div>
    </fieldset>
  );
};

const mapStateToProps = (state, { cameraId }) => {
  const calculatorState = state.frameRateCalculators[cameraId];
  const { driveModel } = calculatorState;
  return { driveModel };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChangeDriveModel: (e) => {
    const driveModel = e.target.value;
    dispatch(updateDriveModel(cameraId, driveModel));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VolucamStorage);
