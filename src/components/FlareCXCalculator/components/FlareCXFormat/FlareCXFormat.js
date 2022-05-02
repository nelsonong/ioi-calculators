import React from 'react';
import { connect } from 'react-redux';
import {
  updateBitDepth,
  updateLinkCount,
  updateLinkSpeed,
} from '../../../../actions/flareCXActions';
import styles from './FlareCXFormat.css';
import { MODEL } from '../../../Core2Calculator/constants';

const FlareCXFormat = ({
  model,
  bitDepth,
  bitDepths,
  linkCount,
  linkCounts,
  linkSpeed,
  linkSpeeds,
  handleInitFormat,
  handleChangeBitDepth,
  handleChangeLinkCount,
  handleChangeLinkSpeed,
}) => {
  const bitDepthOptions = bitDepths.map((bitDepthOption, i) => (
    <option key={i} value={bitDepthOption}>{bitDepthOption}</option>
  ));

  // Limit CXP speed options depending on Core type.
  let maxLinkSpeed = 12;
  if (model) {
    if (model === MODEL.CORE2CX) {
      maxLinkSpeed = 3;
    } else if (model === MODEL.CORE2CXPLUS || model === MODEL.CORE2CXMAX) {
      maxLinkSpeed = 6;
    }
  }

  let selectedSpeedDeleted = true;
  let selectedSpeedOption;
  const linkSpeedOptions = linkSpeeds.map((linkSpeedOption, i) => {
    const trailingNumbers = linkSpeedOption.match(/\d+$/);
    const speed = Number(trailingNumbers[0]);
    if (speed <= maxLinkSpeed) {
      if (linkSpeed === linkSpeedOption) {
        selectedSpeedDeleted = false;
      }

      if (!selectedSpeedOption) {
        selectedSpeedOption = linkSpeedOption;
      }

      return <option key={i} value={linkSpeedOption}>{linkSpeedOption}</option>;
    }

    return '';
  });

  if (selectedSpeedDeleted) {
    handleInitFormat(selectedSpeedOption);
  }

  const linkCountOptions = linkCounts.map((linkCountOption, i) => (
    <option key={i} value={linkCountOption}>{linkCountOption}</option>
  ));
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Output Format</legend>
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
  let calculatorState;
  let model;
  if (!dvrId) {
    calculatorState = state.frameRateCalculators[cameraId];
  } else {
    calculatorState = state.storageCalculators[dvrId].cameras[cameraId];
    ({ model } = state.storageCalculators[dvrId]);
  }

  const {
    bitDepth,
    bitDepths,
    linkCount,
    linkCounts,
    linkSpeed,
    linkSpeeds,
  } = calculatorState;
  return {
    model,
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
  handleInitFormat: (linkSpeed) => {
    dispatch(updateLinkSpeed(cameraId, linkSpeed, dvrId));
  },
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
