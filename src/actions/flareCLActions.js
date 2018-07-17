const UPDATE_MODEL = 'UPDATE_MODEL';
const UPDATE_FORMAT = 'UPDATE_FORMAT';
const UPDATE_RESOLUTION_PRESET = 'UPDATE_RESOLUTION_PRESET';
const UPDATE_WIDTH = 'UPDATE_WIDTH';
const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
const UPDATE_SUB_SAMPLING = 'UPDATE_SUB_SAMPLING';
const UPDATE_SLOW_MODE = 'UPDATE_SLOW_MODE';

const flareCLActionTypes = [
    UPDATE_MODEL,
    UPDATE_FORMAT,
    UPDATE_RESOLUTION_PRESET,
    UPDATE_WIDTH,
    UPDATE_HEIGHT,
    UPDATE_SUB_SAMPLING,
    UPDATE_SLOW_MODE
];

// Action generators
export const updateModel = (id, model) => ({
    type: UPDATE_MODEL,
    id,
    model
});

export const updateHardwareVersion = (id, hwversion) => ({
    type: UPDATE_HW_VERSION,
    id,
    hwversion: Number(hwversion)
});

export const updateFormat = (id, format) => ({
    type: UPDATE_FORMAT,
    id,
    format
});

export const updateResolutionPreset = (id, resolutionPreset) => ({
    type: UPDATE_RESOLUTION_PRESET,
    id,
    resolutionPreset
});

export const updateWidth = (id, width) => ({
    type: UPDATE_WIDTH,
    id,
    width: width
});

export const updateHeight = (id, height) => ({
    type: UPDATE_HEIGHT,
    id,
    height: height
});

export const updateSubSampling = (id, sumSampling) => ({
    type: UPDATE_SUB_SAMPLING,
    id,
    sumSampling
});

export const updateSlowMode = (id, slowMode) => ({
    type: UPDATE_SLOW_MODE,
    id,
    slowMode
});

// Action types
export {
    UPDATE_MODEL,
    UPDATE_FORMAT,
    UPDATE_RESOLUTION_PRESET,
    UPDATE_WIDTH,
    UPDATE_HEIGHT,
    UPDATE_SUB_SAMPLING,
    UPDATE_SLOW_MODE,
    flareCLActionTypes
};