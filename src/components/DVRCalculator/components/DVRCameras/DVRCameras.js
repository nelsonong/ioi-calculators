import React from 'react';
import './DVRCameras.css';

const DVRCameras = ({ cameras }) => {
    const cameraComponents = cameras.map(camera => camera.camera);
    return (
        <fieldset>
        <legend>Cameras</legend>
            <div className='dvr-cameras-container'>
                {cameraComponents}
            </div>
        </fieldset>
    );
}

export default DVRCameras;