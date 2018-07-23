const INITIALIZE_GEV_DVR_STATE = 'INITIALIZE_GEV_DVR_STATE';
const UPDATE_GEV_BIT_DEPTH = 'UPDATE_GEV_BIT_DEPTH';
const UPDATE_GEV_RESOLUTION_PRESET = 'UPDATE_GEV_RESOLUTION_PRESET';
const UPDATE_GEV_WIDTH = 'UPDATE_GEV_WIDTH';
const UPDATE_GEV_HEIGHT = 'UPDATE_GEV_HEIGHT';
const UPDATE_GEV_FRAME_RATE = 'UPDATE_GEV_FRAME_RATE';

const gevActionTypes = [
    INITIALIZE_GEV_DVR_STATE,
    UPDATE_GEV_BIT_DEPTH,
    UPDATE_GEV_RESOLUTION_PRESET,
    UPDATE_GEV_WIDTH,
    UPDATE_GEV_HEIGHT,
    UPDATE_GEV_FRAME_RATE
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
    type: INITIALIZE_GEV_DVR_STATE,
    cameraId,
    dvrId,
    mode
});

export const updateBitDepth = (cameraId, bitDepth, dvrId) => ({
    type: UPDATE_GEV_BIT_DEPTH,
    cameraId,
    bitDepth,
    dvrId
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
    type: UPDATE_GEV_RESOLUTION_PRESET,
    cameraId,
    resolutionPreset,
    dvrId
});

export const updateWidth = (cameraId, width, dvrId) => ({
    type: UPDATE_GEV_WIDTH,
    cameraId,
    width,
    dvrId
});

export const updateHeight = (cameraId, height, dvrId) => ({
    type: UPDATE_GEV_HEIGHT,
    cameraId,
    height,
    dvrId
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
    type: UPDATE_GEV_FRAME_RATE,
    cameraId,
    frameRate,
    dvrId
});

// Action types
export {
    INITIALIZE_GEV_DVR_STATE,
    UPDATE_GEV_BIT_DEPTH,
    UPDATE_GEV_RESOLUTION_PRESET,
    UPDATE_GEV_WIDTH,
    UPDATE_GEV_HEIGHT,
    UPDATE_GEV_FRAME_RATE,
    gevActionTypes
};