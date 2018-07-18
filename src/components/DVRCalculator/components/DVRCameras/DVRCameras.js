import React from 'react';
import { connect } from 'react-redux';
import styles from './DVRCameras.css';

const DVRCameras = ({
    cameraContainers,
    totalDataRate
}) => {
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Cameras</legend>
            <div className={styles.container}>
                {cameraContainers}
            </div>
            <div className={styles.center}>
                <input type='text' className={styles.display} disabled value={`${totalDataRate} MB/s`} />
            </div>
        </fieldset>
    );
}

const mapStateToProps = ({ storageCalculators }, { id }) => {
    const calculatorState = storageCalculators.get(id);
    const {
        cameraContainers,
        totalDataRate
    } = calculatorState;
    return {
        cameraContainers,
        totalDataRate
    };
};

export default connect(mapStateToProps)(DVRCameras);