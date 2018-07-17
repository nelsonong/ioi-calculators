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
export const updateModel = (id, model) => ({
    type: UPDATE_VICTOREM_CX_MODEL,
    id,
    model
});

export const updateFormat = (id, format) => ({
    type: UPDATE_VICTOREM_CX_FORMAT,
    id,
    format
});

export const updateBitDepth = (id, bitDepth) => ({
    type: UPDATE_VICTOREM_CX_BIT_DEPTH,
    id,
    bitDepth
});

export const updateResolutionPreset = (id, resolutionPreset) => ({
    type: UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
    id,
    resolutionPreset
});

export const updateWidth = (id, width) => ({
    type: UPDATE_VICTOREM_CX_WIDTH,
    id,
    width: width
});

export const updateHeight = (id, height) => ({
    type: UPDATE_VICTOREM_CX_HEIGHT,
    id,
    height: height
});

export const updateCameraOption = (id, cameraOption) => ({
    type: UPDATE_VICTOREM_CX_CAMERA_OPTION,
    id,
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