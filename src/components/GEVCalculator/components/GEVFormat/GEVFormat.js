import React from 'react';
import { connect } from 'react-redux';
import { updateBitDepth } from '../../../../actions/gevActions';
import styles from './GEVFormat.css';

const GEVFormat = ({
  bitDepths,
  bitDepth,
  handleChangeBitDepth,
}) => {
  const bitDepthOptions = bitDepths.map((bitDepthOption, i) => (
    <option key={i} value={bitDepthOption}>{bitDepthOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>GEV Format</legend>
      <div className={styles.label}>Bit Depth:</div>
      <select className={styles.select} value={bitDepth} onChange={handleChangeBitDepth}>
        {bitDepthOptions}
      </select>
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = storageCalculators[dvrId].cameras[cameraId];
  const {
    bitDepths,
    bitDepth,
  } = calculatorState;
  return {
    bitDepths,
    bitDepth,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeBitDepth: (e) => {
    const bitDepth = Number(e.target.value);
    dispatch(updateBitDepth(cameraId, bitDepth, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GEVFormat);
