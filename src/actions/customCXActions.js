const INITIALIZE_CUSTOM_CX_DVR_STATE = 'INITIALIZE_CUSTOM_CX_DVR_STATE';
const UPDATE_CUSTOM_CX_BIT_DEPTH = 'UPDATE_CUSTOM_CX_BIT_DEPTH';
const UPDATE_CUSTOM_CX_LINK_COUNT = 'UPDATE_CUSTOM_CX_LINK_COUNT';
const UPDATE_CUSTOM_CX_LINK_SPEED = 'UPDATE_CUSTOM_CX_LINK_SPEED';
const UPDATE_CUSTOM_CX_RESOLUTION_PRESET = 'UPDATE_CUSTOM_CX_RESOLUTION_PRESET';
const UPDATE_CUSTOM_CX_WIDTH = 'UPDATE_CUSTOM_CX_WIDTH';
const UPDATE_CUSTOM_CX_HEIGHT = 'UPDATE_CUSTOM_CX_HEIGHT';
const UPDATE_CUSTOM_CX_FRAME_RATE = 'UPDATE_CUSTOM_CX_FRAME_RATE';

const customCXActionTypes = [
    INITIALIZE_CUSTOM_CX_DVR_STATE,
    UPDATE_CUSTOM_CX_BIT_DEPTH,
    UPDATE_CUSTOM_CX_LINK_COUNT,
    UPDATE_CUSTOM_CX_LINK_SPEED,
    UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CX_WIDTH,
    UPDATE_CUSTOM_CX_HEIGHT,
    UPDATE_CUSTOM_CX_FRAME_RATE
];

// Action generators
export const initializeDVRState = (id, dvrId, mode) => ({
    type: INITIALIZE_CUSTOM_CX_DVR_STATE,
    id,
    dvrId,
    mode
});

export const updateBitDepth = (id, bitDepth, dvrId) => ({
    type: UPDATE_CUSTOM_CX_BIT_DEPTH,
    id,
    bitDepth,
    dvrId
});

export const updateLinkCount = (id, linkCount, dvrId) => ({
    type: UPDATE_CUSTOM_CX_LINK_COUNT,
    id,
    linkCount,
    dvrId
});

export const updateLinkSpeed = (id, linkSpeed, dvrId) => ({
    type: UPDATE_CUSTOM_CX_LINK_SPEED,
    id,
    linkSpeed,
    dvrId
});

export const updateResolutionPreset = (id, resolutionPreset, dvrId) => ({
    type: UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    id,
    resolutionPreset,
    dvrId
});

export const updateWidth = (id, width, dvrId) => ({
    type: UPDATE_CUSTOM_CX_WIDTH,
    id,
    width: width,
    dvrId
});

export const updateHeight = (id, height, dvrId) => ({
    type: UPDATE_CUSTOM_CX_HEIGHT,
    id,
    height: height,
    dvrId
});

export const updateFrameRate = (id, frameRate, dvrId) => ({
    type: UPDATE_CUSTOM_CX_FRAME_RATE,
    id,
    frameRate,
    dvrId
});

// Action types
export {
    INITIALIZE_CUSTOM_CX_DVR_STATE,
    UPDATE_CUSTOM_CX_BIT_DEPTH,
    UPDATE_CUSTOM_CX_LINK_COUNT,
    UPDATE_CUSTOM_CX_LINK_SPEED,
    UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
    UPDATE_CUSTOM_CX_WIDTH,
    UPDATE_CUSTOM_CX_HEIGHT,
    UPDATE_CUSTOM_CX_FRAME_RATE,
    customCXActionTypes
};