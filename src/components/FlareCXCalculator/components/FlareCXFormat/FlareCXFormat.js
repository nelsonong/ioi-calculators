import React from 'react';
import { connect } from 'react-redux';
import {
  updateBitDepth,
  updateLinkCount,
  updateLinkSpeed,
} from '../../../../actions/flareCXActions';
import styles from './FlareCXFormat.css';

const FlareCXFormat = ({
  bitDepth,
  bitDepths,
  linkCount,
  linkCounts,
  linkSpeed,
  linkSpeeds,
  handleChangeBitDepth,
  handleChangeLinkCount,
  handleChangeLinkSpeed,
}) => {
  const bitDepthOptions = bitDepths.map((bitDepthOption, i) => (
    <option key={i} value={bitDepthOption}>{bitDepthOption}</option>
  ));
  const linkSpeedOptions = linkSpeeds.map((linkSpeedOption, i) => (
    <option key={i} value={linkSpeedOption}>{linkSpeedOption}</option>
  ));
  const linkCountOptions = linkCounts.map((linkCountOption, i) => (
    <option key={i} value={linkCountOption}>{linkCountOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>CoaXPress Format</legend>
    <div className={styles.left}>
      <div className={styles.labels}>
        <div className={styles.label}>Bit Depth:</div>
        <div className={styles.label}>Links:</div>
      </div>
      <div className={styles.selects}>
        <select className={styles.select} value={bitDepth} onChange={handleChangeBitDepth}>
          {bitDepthOptions}
        </select>
        <select className={styles.select} value={linkCount} onChange={handleChangeLinkCount}>
          {linkCountOptions}
        </select>
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.label}>Speed:</div>
      <select className={styles.select} value={linkSpeed} onChange={handleChangeLinkSpeed}>
        {linkSpeedOptions}
      </select>
    </div>
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
    bitDepth,
    bitDepths,
    linkCount,
    linkCounts,
    linkSpeed,
    linkSpeeds,
  } = calculatorState;
  return {
    bitDepth,
    bitDepths,
    linkCount,
    linkCounts,
    linkSpeed,
    linkSpeeds,
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

  handleChangeLinkSpeed: (e) => {
    const linkSpeed = e.target.value;
    dispatch(updateLinkSpeed(cameraId, linkSpeed, dvrId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlareCXFormat);
