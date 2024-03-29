import React from 'react';
import { connect } from 'react-redux';
import { updateInterface } from '../../../../actions/victoremSDIActions';
import INTERFACES from '../../constants/interfaces';
import styles from './VictoremSDIInterface.css';

const VictoremSDIInterface = ({
  sdiInterface,
  sdiInterfaces,
  handleChange,
}) => {
  const sdiInterfaceOptions = sdiInterfaces.map((sdiInterfaceOption, i) => (
    <option key={i} value={sdiInterfaceOption}>{sdiInterfaceOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Interface</legend>
      <select className={styles.select} value={sdiInterface} onChange={handleChange}>
        {sdiInterfaceOptions}
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
  const { sdiInterface } = calculatorState;
  let { sdiInterfaces } = calculatorState;
  if (dvrId) sdiInterfaces = sdiInterfaces.filter(e => e !== INTERFACES.S_6G_SDI && e !== INTERFACES.S_12G_SDI);
  return {
    sdiInterface,
    sdiInterfaces,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChange: (e) => {
    const sdiInterface = e.target.value;
    dispatch(updateInterface(cameraId, sdiInterface, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIInterface);
