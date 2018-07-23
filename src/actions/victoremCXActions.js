const UPDATE_VICTOREM_CX_MODEL = 'UPDATE_VICTOREM_CX_MODEL';
const UPDATE_VICTOREM_CX_FORMAT = 'UPDATE_VICTOREM_CX_FORMAT';
const UPDATE_VICTOREM_CX_BIT_DEPTH = 'UPDATE_VICTOREM_CX_BIT_DEPTH';
const UPDATE_VICTOREM_CX_RESOLUTION_PRESET = 'UPDATE_VICTOREM_CX_RESOLUTION_PRESET';
const UPDATE_VICTOREM_CX_WIDTH = 'UPDATE_VICTOREM_CX_WIDTH';
const UPDATE_VICTOREM_CX_HEIGHT = 'UPDATE_VICTOREM_CX_HEIGHT';
const UPDATE_VICTOREM_CX_CAMERA_OPTION = 'UPDATE_VICTOREM_CX_CAMERA_OPTION';

const victoremCXActionTypes = [
    UPDATE_VICTOREM_CX_MODEL,
    UPDATE_VICTOREM_CX_FORMAT,
    UPDATE_VICTOREM_CX_BIT_DEPTH,
    UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
    UPDATE_VICTOREM_CX_WIDTH,
    UPDATE_VICTOREM_CX_HEIGHT,
    UPDATE_VICTOREM_CX_CAMERA_OPTION
];

// Action generators
export const updateModel = (cameraId, model) => ({
    type: UPDATE_VICTOREM_CX_MODEL,
    cameraId,
    model
});

export const updateFormat = (cameraId, format) => ({
    type: UPDATE_VICTOREM_CX_FORMAT,
    cameraId,
    format
});

export const updateBitDepth = (cameraId, bitDepth) => ({
    type: UPDATE_VICTOREM_CX_BIT_DEPTH,
    cameraId,
    bitDepth
});

export const updateResolutionPreset = (cameraId, resolutionPreset) => ({
    type: UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
    cameraId,
    resolutionPreset
});

export const updateWidth = (cameraId, width) => ({
    type: UPDATE_VICTOREM_CX_WIDTH,
    cameraId,
    width
});

export const updateHeight = (cameraId, height) => ({
    type: UPDATE_VICTOREM_CX_HEIGHT,
    cameraId,
    height
});

export const updateCameraOption = (cameraId, cameraOption) => ({
    type: UPDATE_VICTOREM_CX_CAMERA_OPTION,
    cameraId,
    cameraOption
});

// Action types
export {
    UPDATE_VICTOREM_CX_MODEL,
    UPDATE_VICTOREM_CX_FORMAT,
    UPDATE_VICTOREM_CX_BIT_DEPTH,
    UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
    UPDATE_VICTOREM_CX_WIDTH,
    UPDATE_VICTOREM_CX_HEIGHT,
    UPDATE_VICTOREM_CX_CAMERA_OPTION,
    victoremCXActionTypes
};