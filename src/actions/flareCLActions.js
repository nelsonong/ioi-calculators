const UPDATE_CL_MODEL = 'UPDATE_CL_MODEL';
const UPDATE_CL_FORMAT = 'UPDATE_CL_FORMAT';
const UPDATE_CL_RESOLUTION_PRESET = 'UPDATE_CL_RESOLUTION_PRESET';
const UPDATE_CL_WIDTH = 'UPDATE_CL_WIDTH';
const UPDATE_CL_HEIGHT = 'UPDATE_CL_HEIGHT';
const UPDATE_CL_SUB_SAMPLING = 'UPDATE_CL_SUB_SAMPLING';
const UPDATE_CL_SLOW_MODE = 'UPDATE_CL_SLOW_MODE';

const flareCLActionTypes = [
    UPDATE_CL_MODEL,
    UPDATE_CL_FORMAT,
    UPDATE_CL_RESOLUTION_PRESET,
    UPDATE_CL_WIDTH,
    UPDATE_CL_HEIGHT,
    UPDATE_CL_SUB_SAMPLING,
    UPDATE_CL_SLOW_MODE
];

// Action generators
export const updateCLModel = (id, model) => ({
    type: UPDATE_CL_MODEL,
    id,
    model
});

export const updateCLHardwareVersion = (id, hwversion) => ({
    type: UPDATE_CL_HW_VERSION,
    id,
    hwversion: Number(hwversion)
});

export const updateCLFormat = (id, format) => ({
    type: UPDATE_CL_FORMAT,
    id,
    format
});

export const updateCLResolutionPreset = (id, resolutionPreset) => ({
    type: UPDATE_CL_RESOLUTION_PRESET,
    id,
    resolutionPreset
});

export const updateCLWidth = (id, width) => ({
    type: UPDATE_CL_WIDTH,
    id,
    width: width
});

export const updateCLHeight = (id, height) => ({
    type: UPDATE_CL_HEIGHT,
    id,
    height: height
});

export const updateCLSubSampling = (id, sumSampling) => ({
    type: UPDATE_CL_SUB_SAMPLING,
    id,
    sumSampling
});

export const updateCLSlowMode = (id, slowMode) => ({
    type: UPDATE_CL_SLOW_MODE,
    id,
    slowMode
});

// Action types
export {
    UPDATE_CL_MODEL,
    UPDATE_CL_FORMAT,
    UPDATE_CL_RESOLUTION_PRESET,
    UPDATE_CL_WIDTH,
    UPDATE_CL_HEIGHT,
    UPDATE_CL_SUB_SAMPLING,
    UPDATE_CL_SLOW_MODE,
    flareCLActionTypes
};