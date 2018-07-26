import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { deleteCalculator } from '../../actions/managementActions';
import styles from './CalculatorTopBar.css';

const CalculatorTopBar = ({
  type,
  inDVR,
  storage,
  handleDelete,
}) => {
  const text = (!inDVR || storage) ? `${type} Calculator` : `${type} Camera`;
  const closeButton = cx(styles.closeButton, { [styles.storageCloseButton]: storage });
  const button = (!inDVR || storage) ? (
    <button type='button' className={closeButton} onClick={handleDelete}>
      ✖
    </button>
  ) : '';
  const root = cx(styles.root, { [styles.storageRoot]: storage });
  return (
    <div>
      <div className={root}>{text}</div>
      {button}
    </div>
  );
};

const mapDispatchToProps = (dispatch, {
  cameraId,
  dvrId,
  type,
  storage,
}) => ({
  type,
  inDVR: !!dvrId,
  storage: !!storage,
  handleDelete: () => {
    if (dvrId) {
      dispatch(deleteCalculator(dvrId, !!storage));
    }

    dispatch(deleteCalculator(cameraId, !!storage));
  },
});

export default connect(null, mapDispatchToProps)(CalculatorTopBar);
