const INITIALIZE_CUSTOM_CX_DVR_STATE = 'INITIALIZE_CUSTOM_CX_DVR_STATE';
const UPDATE_CUSTOM_CX_BIT_DEPTH = 'UPDATE_CUSTOM_CX_BIT_DEPTH';
const UPDATE_CUSTOM_CX_LINK_COUNT = 'UPDATE_CUSTOM_CX_LINK_COUNT';
const UPDATE_CUSTOM_CX_RESOLUTION_PRESET = 'UPDATE_CUSTOM_CX_RESOLUTION_PRESET';
const UPDATE_CUSTOM_CX_WIDTH = 'UPDATE_CUSTOM_CX_WIDTH';
const UPDATE_CUSTOM_CX_HEIGHT = 'UPDATE_CUSTOM_CX_HEIGHT';
const UPDATE_CUSTOM_CX_FRAME_RATE = 'UPDATE_CUSTOM_CX_FRAME_RATE';

const customCXActionTypes = [
    INITIALIZE_CUSTOM_CX_DVR_STATE,
    UPDATE_CUSTOM_CX_BIT_DEPTH,
    UPDATE_CUSTOM_CX_LINK_COUNT,
    UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CX_WIDTH,
    UPDATE_CUSTOM_CX_HEIGHT,
    UPDATE_CUSTOM_CX_FRAME_RATE
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
    type: INITIALIZE_CUSTOM_CX_DVR_STATE,
    cameraId,
    dvrId,
    mode
});

export const updateBitDepth = (cameraId, bitDepth, dvrId) => ({
    type: UPDATE_CUSTOM_CX_BIT_DEPTH,
    cameraId,
    bitDepth,
    dvrId
});

export const updateLinkCount = (cameraId, linkCount, dvrId) => ({
    type: UPDATE_CUSTOM_CX_LINK_COUNT,
    cameraId,
    linkCount,
    dvrId
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
    type: UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    cameraId,
    resolutionPreset,
    dvrId
});

export const updateWidth = (cameraId, width, dvrId) => ({
    type: UPDATE_CUSTOM_CX_WIDTH,
    cameraId,
    width,
    dvrId
});

export const updateHeight = (cameraId, height, dvrId) => ({
    type: UPDATE_CUSTOM_CX_HEIGHT,
    cameraId,
    height,
    dvrId
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
    type: UPDATE_CUSTOM_CX_FRAME_RATE,
    cameraId,
    frameRate,
    dvrId
});

// Action types
export {
    INITIALIZE_CUSTOM_CX_DVR_STATE,
    UPDATE_CUSTOM_CX_BIT_DEPTH,
    UPDATE_CUSTOM_CX_LINK_COUNT,
    UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CX_WIDTH,
    UPDATE_CUSTOM_CX_HEIGHT,
    UPDATE_CUSTOM_CX_FRAME_RATE,
    customCXActionTypes
};