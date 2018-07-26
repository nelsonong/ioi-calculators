import React from 'react';
import { connect } from 'react-redux';
import { updateResolution } from '../../../../actions/victoremSDIActions';
import styles from './VictoremSDIResolution.css';

const VictoremSDIResolution = ({
  resolution,
  resolutions,
  handleChange,
}) => {
  const resolutionOptions = resolutions.map((resolutionOption, i) => (
    <option key={i} value={resolutionOption}>{resolutionOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Resolution</legend>
      <select className={styles.select} value={resolution} onChange={handleChange}>
        {resolutionOptions}
      </select>
    </fieldset>
  );
};

const mapStateToProps = (state, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = !dvrId
    ? state.frameRateCalculators[cameraId]
    : state.storageCalculators[dvrId].cameras[cameraId];
  const {
    resolution,
    resolutions,
  } = calculatorState;
  return {
    resolution,
    resolutions,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const resolution = e.target.value;
    dispatch(updateResolution(cameraId, resolution, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIResolution);
