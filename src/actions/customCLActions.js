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
export const initializeDVRState = (id, dvrId, mode) => ({
    type: INITIALIZE_CUSTOM_CL_DVR_STATE,
    id,
    dvrId,
    mode
});

export const updateModel = (id, model, dvrId) => ({
    type: UPDATE_CUSTOM_CL_MODEL,
    id,
    model,
    dvrId
});

export const updateFormat = (id, format, dvrId) => ({
    type: UPDATE_CUSTOM_CL_FORMAT,
    id,
    format,
    dvrId
});

export const updateResolutionPreset = (id, resolutionPreset, dvrId) => ({
    type: UPDATE_CUSTOM_CL_RESOLUTION_PRESET,
    id,
    resolutionPreset,
    dvrId
});

export const updateWidth = (id, width, dvrId) => ({
    type: UPDATE_CUSTOM_CL_WIDTH,
    id,
    width: width,
    dvrId
});

export const updateHeight = (id, height, dvrId) => ({
    type: UPDATE_CUSTOM_CL_HEIGHT,
    id,
    height: height,
    dvrId
});

export const updateFrameRate = (id, frameRate, dvrId) => ({
    type: UPDATE_CUSTOM_CL_FRAME_RATE,
    id,
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