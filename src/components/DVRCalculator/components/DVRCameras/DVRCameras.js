import React from 'react';
import styles from './DVRCameras.css';

const DVRCameras = ({ cameras }) => {
    const cameraComponents = cameras.map(camera => camera.camera);
    return (
        <fieldset className={styles.root}>
        <legend className={styles.legend}>Cameras</legend>
            <div className={styles.container}>
                {cameraComponents}
            </div>
        </fieldset>
    );
}

export default DVRCameras;