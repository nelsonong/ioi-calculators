const UPDATE_FLARE_CL_MODEL = 'UPDATE_FLARE_CL_MODEL';
const UPDATE_FLARE_CL_FORMAT = 'UPDATE_FLARE_CL_FORMAT';
const UPDATE_FLARE_CL_RESOLUTION_PRESET = 'UPDATE_FLARE_CL_RESOLUTION_PRESET';
const UPDATE_FLARE_CL_WIDTH = 'UPDATE_FLARE_CL_WIDTH';
const UPDATE_FLARE_CL_HEIGHT = 'UPDATE_FLARE_CL_HEIGHT';
const UPDATE_FLARE_CL_SUB_SAMPLING = 'UPDATE_FLARE_CL_SUB_SAMPLING';
const UPDATE_FLARE_CL_SLOW_MODE = 'UPDATE_FLARE_CL_SLOW_MODE';

const flareCLActionTypes = [
    UPDATE_FLARE_CL_MODEL,
    UPDATE_FLARE_CL_FORMAT,
    UPDATE_FLARE_CL_RESOLUTION_PRESET,
    UPDATE_FLARE_CL_WIDTH,
    UPDATE_FLARE_CL_HEIGHT,
    UPDATE_FLARE_CL_SUB_SAMPLING,
    UPDATE_FLARE_CL_SLOW_MODE
];

// Action generators
export const updateModel = (id, model) => ({
    type: UPDATE_FLARE_CL_MODEL,
    id,
    model
});

export const updateHardwareVersion = (id, hwversion) => ({
    type: UPDATE_FLARE_CL_HW_VERSION,
    id,
    hwversion: Number(hwversion)
});

export const updateFormat = (id, format) => ({
    type: UPDATE_FLARE_CL_FORMAT,
    id,
    format
});

export const updateResolutionPreset = (id, resolutionPreset) => ({
    type: UPDATE_FLARE_CL_RESOLUTION_PRESET,
    id,
    resolutionPreset
});

export const updateWidth = (id, width) => ({
    type: UPDATE_FLARE_CL_WIDTH,
    id,
    width: width
});

export const updateHeight = (id, height) => ({
    type: UPDATE_FLARE_CL_HEIGHT,
    id,
    height: height
});

export const updateSubSampling = (id, sumSampling) => ({
    type: UPDATE_FLARE_CL_SUB_SAMPLING,
    id,
    sumSampling
});

export const updateSlowMode = (id, slowMode) => ({
    type: UPDATE_FLARE_CL_SLOW_MODE,
    id,
    slowMode
});

// Action types
export {
    UPDATE_FLARE_CL_MODEL,
    UPDATE_FLARE_CL_FORMAT,
    UPDATE_FLARE_CL_RESOLUTION_PRESET,
    UPDATE_FLARE_CL_WIDTH,
    UPDATE_FLARE_CL_HEIGHT,
    UPDATE_FLARE_CL_SUB_SAMPLING,
    UPDATE_FLARE_CL_SLOW_MODE,
    flareCLActionTypes
};