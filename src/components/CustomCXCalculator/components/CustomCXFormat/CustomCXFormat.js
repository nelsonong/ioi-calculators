import React from 'react';
import { connect } from 'react-redux';
import {
  updateBitDepth,
  updateLinkCount,
} from '../../../../actions/customCXActions';
import { MODE } from '../../constants';
import styles from './CustomCXFormat.css';

const renderLinkCountOptions = (formats, mode) => {
  if (!mode) {
    return formats.LinkCounts.map((linkCount, i) => (
      <option key={i} value={linkCount}>{linkCount}</option>
    ));
  }

  let linkCount;
  switch (mode) {
    case MODE.SINGLE:
      linkCount = 1;
      break;
    case MODE.DUAL:
      linkCount = 2;
      break;
    case MODE.QUAD:
      linkCount = 4;
      break;
    default:
      break;
  }

  return <option value={linkCount}>{linkCount}</option>;
};

const CustomCXFormat = ({
  formats,
  bitDepth,
  linkCount,
  mode,
  handleChangeBitDepth,
  handleChangeLinkCount,
}) => {
  const bitDepthOptions = formats.BitDepths.map((bitDepthOption, i) => (
    <option key={i} value={bitDepthOption}>{bitDepthOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>CoaXPress Format</legend>
      <div className={styles.left}>
        <div className={styles.label}>Bit Depth:</div>
        <select className={styles.select} value={bitDepth} onChange={handleChangeBitDepth}>
          {bitDepthOptions}
        </select>
      </div>
      <div className={styles.right}>
        <div className={styles.label}>Links:</div>
        <select className={styles.select} value={linkCount} onChange={handleChangeLinkCount}>
          {renderLinkCountOptions(formats, mode)}
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
    const bitDepth = Number(e.target.value);
    dispatch(updateBitDepth(cameraId, bitDepth, dvrId));
  },

  handleChangeLinkCount: (e) => {
    const linkCount = Number(e.target.value);
    dispatch(updateLinkCount(cameraId, linkCount, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCXFormat);
