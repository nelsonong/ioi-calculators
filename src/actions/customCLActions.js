const INITIALIZE_CUSTOM_CL_DVR_STATE = 'INITIALIZE_CUSTOM_CL_DVR_STATE';
const UPDATE_CUSTOM_CL_FORMAT = 'UPDATE_CUSTOM_CL_FORMAT';
const UPDATE_CUSTOM_CL_RESOLUTION_PRESET = 'UPDATE_CUSTOM_CL_RESOLUTION_PRESET';
const UPDATE_CUSTOM_CL_WIDTH = 'UPDATE_CUSTOM_CL_WIDTH';
const UPDATE_CUSTOM_CL_HEIGHT = 'UPDATE_CUSTOM_CL_HEIGHT';
const UPDATE_CUSTOM_CL_FRAME_RATE = 'UPDATE_CUSTOM_CL_FRAME_RATE';

const customCLActionTypes = [
    INITIALIZE_CUSTOM_CL_DVR_STATE,
    UPDATE_CUSTOM_CL_FORMAT,
    UPDATE_CUSTOM_CL_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CL_WIDTH,
    UPDATE_CUSTOM_CL_HEIGHT,
    UPDATE_CUSTOM_CL_FRAME_RATE
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
    type: INITIALIZE_CUSTOM_CL_DVR_STATE,
    cameraId,
    dvrId,
    mode
});

export const updateModel = (cameraId, model, dvrId) => ({
    type: UPDATE_CUSTOM_CL_MODEL,
    cameraId,
    model,
    dvrId
});

export const updateFormat = (cameraId, format, dvrId) => ({
    type: UPDATE_CUSTOM_CL_FORMAT,
    cameraId,
    format,
    dvrId
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
    type: UPDATE_CUSTOM_CL_RESOLUTION_PRESET,
    cameraId,
    resolutionPreset,
    dvrId
});

export const updateWidth = (cameraId, dvrId) => ({
    type: UPDATE_CUSTOM_CL_WIDTH,
    cameraId,
    width,
    dvrId
});

export const updateHeight = (cameraId, height, dvrId) => ({
    type: UPDATE_CUSTOM_CL_HEIGHT,
    cameraId,
    height,
    dvrId
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
    type: UPDATE_CUSTOM_CL_FRAME_RATE,
    cameraId,
    frameRate,
    dvrId
});

// Action types
export {
    INITIALIZE_CUSTOM_CL_DVR_STATE,
    UPDATE_CUSTOM_CL_FORMAT,
    UPDATE_CUSTOM_CL_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CL_WIDTH,
    UPDATE_CUSTOM_CL_HEIGHT,
    UPDATE_CUSTOM_CL_FRAME_RATE,
    customCLActionTypes
};