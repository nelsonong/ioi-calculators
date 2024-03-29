import React from 'react';
import { connect } from 'react-redux';
import Core2Camera from '../Core2Camera';
import styles from './Core2Cameras.css';

const Core2Cameras = ({ cameras }) => {
  const cameraComponents = cameras.order.map((orderId) => {
    const cameraState = cameras[orderId];
    const {
      cameraId,
      dvrId,
      link,
      mode,
    } = cameraState;
    return (
      <Core2Camera
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

export default connect(mapStateToProps)(Core2Cameras);
