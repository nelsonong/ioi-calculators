const INITIALIZE_FLARE_CX_DVR_STATE = 'INITIALIZE_FLARE_CX_DVR_STATE';
const UPDATE_FLARE_CX_MODEL = 'UPDATE_FLARE_CX_MODEL';
const UPDATE_FLARE_CX_BIT_DEPTH = 'UPDATE_FLARE_CX_BIT_DEPTH';
const UPDATE_FLARE_CX_LINK_COUNT = 'UPDATE_FLARE_CX_LINK_COUNT';
const UPDATE_FLARE_CX_LINK_SPEED = 'UPDATE_FLARE_CX_LINK_SPEED';
const UPDATE_FLARE_CX_RESOLUTION_PRESET = 'UPDATE_FLARE_CX_RESOLUTION_PRESET';
const UPDATE_FLARE_CX_WIDTH = 'UPDATE_FLARE_CX_WIDTH';
const UPDATE_FLARE_CX_HEIGHT = 'UPDATE_FLARE_CX_HEIGHT';
const UPDATE_FLARE_CX_SUB_SAMPLING = 'UPDATE_FLARE_CX_SUB_SAMPLING';

const flareCXActionTypes = [
    INITIALIZE_FLARE_CX_DVR_STATE,
    UPDATE_FLARE_CX_MODEL,
    UPDATE_FLARE_CX_BIT_DEPTH,
    UPDATE_FLARE_CX_LINK_COUNT,
    UPDATE_FLARE_CX_LINK_SPEED,
    UPDATE_FLARE_CX_RESOLUTION_PRESET,
    UPDATE_FLARE_CX_WIDTH,
    UPDATE_FLARE_CX_HEIGHT,
    UPDATE_FLARE_CX_SUB_SAMPLING
];

// Action generators
export const initializeDVRState = (id, dvrId, mode) => ({
    type: INITIALIZE_FLARE_CX_DVR_STATE,
    id,
    dvrId,
    mode
});

export const updateModel = (id, model, dvrId) => ({
    type: UPDATE_FLARE_CX_MODEL,
    id,
    model,
    dvrId
});

export const updateBitDepth = (id, bitDepth, dvrId) => ({
    type: UPDATE_FLARE_CX_BIT_DEPTH,
    id,
    bitDepth,
    dvrId
});

export const updateLinkCount = (id, linkCount, dvrId) => ({
    type: UPDATE_FLARE_CX_LINK_COUNT,
    id,
    linkCount,
    dvrId
});

export const updateLinkSpeed = (id, linkSpeed, dvrId) => ({
    type: UPDATE_FLARE_CX_LINK_SPEED,
    id,
    linkSpeed,
    dvrId
});

export const updateResolutionPreset = (id, resolutionPreset, dvrId) => ({
    type: UPDATE_FLARE_CX_RESOLUTION_PRESET,
    id,
    resolutionPreset,
    dvrId
});

export const updateWidth = (id, width, dvrId) => ({
    type: UPDATE_FLARE_CX_WIDTH,
    id,
    width: width,
    dvrId
});

export const updateHeight = (id, height, dvrId) => ({
    type: UPDATE_FLARE_CX_HEIGHT,
    id,
    height: height,
    dvrId
});

export const updateSubSampling = (id, subSampling, dvrId) => ({
    type: UPDATE_FLARE_CX_SUB_SAMPLING,
    id,
    subSampling,
    dvrId
});

// Action types
export {
    INITIALIZE_FLARE_CX_DVR_STATE,
    UPDATE_FLARE_CX_MODEL,
    UPDATE_FLARE_CX_BIT_DEPTH,
    UPDATE_FLARE_CX_LINK_COUNT,
    UPDATE_FLARE_CX_LINK_SPEED,
    UPDATE_FLARE_CX_RESOLUTION_PRESET,
    UPDATE_FLARE_CX_WIDTH,
    UPDATE_FLARE_CX_HEIGHT,
    UPDATE_FLARE_CX_SUB_SAMPLING,
    flareCXActionTypes
};