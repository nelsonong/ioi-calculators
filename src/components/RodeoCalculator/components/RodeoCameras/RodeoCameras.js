import React from 'react';
import { connect } from 'react-redux';
import RodeoCamera from '../RodeoCamera';
import styles from './RodeoCameras.css';

const RodeoCameras = ({ cameras }) => {
  const cameraComponents = cameras.order.map((orderId) => {
    const cameraState = cameras[orderId];
    const {
      cameraId,
      dvrId,
      link,
      mode,
    } = cameraState;
    return (
      <RodeoCamera
        key={cameraId}
        cameraId={cameraId}
        dvrId={dvrId}
        cameraState={cameraState}
        link={link}
        mode={mode}
      />
    );
  });
  return (
    <fieldset className={styles.root}>
    <legend className={styles.legend}>Cameras</legend>
      <div className={styles.container}>
        {cameraComponents}
      </div>
    </fieldset>
  );
};

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
  const calculatorState = storageCalculators[dvrId];
  const { cameras } = calculatorState;
  return { cameras };
};

export default connect(mapStateToProps)(RodeoCameras);
