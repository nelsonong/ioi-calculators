const INITIALIZE_FLARE_CL_DVR_STATE = 'INITIALIZE_FLARE_CL_DVR_STATE';
const UPDATE_FLARE_CL_MODEL = 'UPDATE_FLARE_CL_MODEL';
const UPDATE_FLARE_CL_FORMAT = 'UPDATE_FLARE_CL_FORMAT';
const UPDATE_FLARE_CL_RESOLUTION_PRESET = 'UPDATE_FLARE_CL_RESOLUTION_PRESET';
const UPDATE_FLARE_CL_WIDTH = 'UPDATE_FLARE_CL_WIDTH';
const UPDATE_FLARE_CL_HEIGHT = 'UPDATE_FLARE_CL_HEIGHT';
const UPDATE_FLARE_CL_SUB_SAMPLING = 'UPDATE_FLARE_CL_SUB_SAMPLING';
const UPDATE_FLARE_CL_SLOW_MODE = 'UPDATE_FLARE_CL_SLOW_MODE';

const flareCLActionTypes = [
    INITIALIZE_FLARE_CL_DVR_STATE,
    UPDATE_FLARE_CL_MODEL,
    UPDATE_FLARE_CL_FORMAT,
    UPDATE_FLARE_CL_RESOLUTION_PRESET,
    UPDATE_FLARE_CL_WIDTH,
    UPDATE_FLARE_CL_HEIGHT,
    UPDATE_FLARE_CL_SUB_SAMPLING,
    UPDATE_FLARE_CL_SLOW_MODE
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
    type: INITIALIZE_FLARE_CL_DVR_STATE,
    cameraId,
    dvrId,
    mode
});

export const updateModel = (cameraId, model, dvrId) => ({
    type: UPDATE_FLARE_CL_MODEL,
    cameraId,
    model,
    dvrId
});

export const updateHardwareVersion = (cameraId, hwversion, dvrId) => ({
    type: UPDATE_FLARE_CL_HW_VERSION,
    cameraId,
    hwversion: Number(hwversion),
    dvrId
});

export const updateFormat = (cameraId, format, dvrId) => ({
    type: UPDATE_FLARE_CL_FORMAT,
    cameraId,
    format,
    dvrId
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
    type: UPDATE_FLARE_CL_RESOLUTION_PRESET,
    cameraId,
    resolutionPreset,
    dvrId
});

export const updateWidth = (cameraId, width, dvrId) => ({
    type: UPDATE_FLARE_CL_WIDTH,
    cameraId,
    width,
    dvrId
});

export const updateHeight = (cameraId, height, dvrId) => ({
    type: UPDATE_FLARE_CL_HEIGHT,
    cameraId,
    height,
    dvrId
});

export const updateSubSampling = (cameraId, subSampling, dvrId) => ({
    type: UPDATE_FLARE_CL_SUB_SAMPLING,
    cameraId,
    subSampling,
    dvrId
});

export const updateSlowMode = (cameraId, slowMode, dvrId) => ({
    type: UPDATE_FLARE_CL_SLOW_MODE,
    cameraId,
    slowMode,
    dvrId
});

// Action types
export {
    INITIALIZE_FLARE_CL_DVR_STATE,
    UPDATE_FLARE_CL_MODEL,
    UPDATE_FLARE_CL_FORMAT,
    UPDATE_FLARE_CL_RESOLUTION_PRESET,
    UPDATE_FLARE_CL_WIDTH,
    UPDATE_FLARE_CL_HEIGHT,
    UPDATE_FLARE_CL_SUB_SAMPLING,
    UPDATE_FLARE_CL_SLOW_MODE,
    flareCLActionTypes
};