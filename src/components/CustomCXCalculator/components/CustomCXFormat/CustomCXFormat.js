import React from 'react';
import { connect } from 'react-redux';
import {
  updateBitDepth,
  updateLinkCount,
} from '../../../../actions/customCXActions';
import { FORMATS } from '../../constants';
import styles from './CustomCXFormat.css';

const CustomCXFormat = ({
  bitDepth,
  linkCount,
  handleChangeBitDepth,
  handleChangeLinkCount,
}) => {
  const bitDepthOptions = FORMATS.map((bitDepthOption, i) => (
    <option key={i} value={bitDepthOption}>{bitDepthOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>CoaXPress Format</legend>
      <div className={styles.left}>
        <div className={styles.label}>Bit Depth:</div>
        <div className={styles.label}>Links:</div>
      </div>
      <div className={styles.right}>
        <select className={styles.select} value={bitDepth} onChange={handleChangeBitDepth}>
          {bitDepthOptions}
        </select>
        <select className={styles.select} value={linkCount} onChange={handleChangeLinkCount}>
          <option value={linkCount}>{linkCount}</option>
        </select>
      </div>
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, {
  cameraId,
  dvrId,
}) => {
  const calculatorState = storageCalculators[dvrId].cameras[cameraId];
  const {
    formats,
    bitDepth,
    linkCount,
    mode,
  } = calculatorState;
  return {
    formats,
    bitDepth,
    linkCount,
    mode,
  };
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
}) => ({
  handleChangeBitDepth: (e) => {
    const bitDepth = e.target.value;
    dispatch(updateBitDepth(cameraId, bitDepth, dvrId));
  },

  handleChangeLinkCount: (e) => {
    const linkCount = Number(e.target.value);
    dispatch(updateLinkCount(cameraId, linkCount, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCXFormat);
