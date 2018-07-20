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
export const initializeDVRState = (id, dvrId, mode) => ({
    type: INITIALIZE_FLARE_CL_DVR_STATE,
    id,
    dvrId,
    mode
});

export const updateModel = (id, model, dvrId) => ({
    type: UPDATE_FLARE_CL_MODEL,
    id,
    model,
    dvrId
});

export const updateHardwareVersion = (id, hwversion, dvrId) => ({
    type: UPDATE_FLARE_CL_HW_VERSION,
    id,
    hwversion: Number(hwversion),
    dvrId
});

export const updateFormat = (id, format, dvrId) => ({
    type: UPDATE_FLARE_CL_FORMAT,
    id,
    format,
    dvrId
});

export const updateResolutionPreset = (id, resolutionPreset, dvrId) => ({
    type: UPDATE_FLARE_CL_RESOLUTION_PRESET,
    id,
    resolutionPreset,
    dvrId
});

export const updateWidth = (id, width, dvrId) => ({
    type: UPDATE_FLARE_CL_WIDTH,
    id,
    width: width,
    dvrId
});

export const updateHeight = (id, height, dvrId) => ({
    type: UPDATE_FLARE_CL_HEIGHT,
    id,
    height: height,
    dvrId
});

export const updateSubSampling = (id, subSampling, dvrId) => ({
    type: UPDATE_FLARE_CL_SUB_SAMPLING,
    id,
    subSampling,
    dvrId
});

export const updateSlowMode = (id, slowMode, dvrId) => ({
    type: UPDATE_FLARE_CL_SLOW_MODE,
    id,
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