import React from 'react';

const DVRCameras = ({ cameras }) => {
    const cameraComponents = cameras.map(camera => camera.camera);
    return (
        <fieldset>
        <legend>Cameras</legend>
            {cameraComponents}
        </fieldset>
    );
}

export default DVRCameras;