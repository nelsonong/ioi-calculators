import React from 'react';
import { connect } from 'react-redux';
import { updateInterface } from '../../../../actions/victoremSDIActions';
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

const mapStateToProps = ({ frameRateCalculators }, { cameraId }) => {
  const calculatorState = frameRateCalculators[cameraId];
  const {
    sdiInterface,
    sdiInterfaces,
  } = calculatorState;
  return {
    sdiInterface,
    sdiInterfaces,
  };
};

const mapDispatchToProps = (dispatch, { cameraId }) => ({
  handleChange: (e) => {
    const sdiInterface = e.target.value;
    dispatch(updateInterface(cameraId, sdiInterface));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoremSDIInterface);
