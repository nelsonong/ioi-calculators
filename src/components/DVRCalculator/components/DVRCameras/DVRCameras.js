import React from 'react';
import { connect } from 'react-redux';
import styles from './DVRCameras.css';

const DVRCameras = ({ cameraContainers }) => {
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Cameras</legend>
            <div className={styles.container}>
                {cameraContainers}
            </div>
        </fieldset>
    );
}

const mapStateToProps = ({ storageCalculators }, { dvrId }) => {
    const calculatorState = storageCalculators[dvrId];
    const { cameraContainers } = calculatorState;
    return { cameraContainers };
};

export default connect(mapStateToProps)(DVRCameras);