const UPDATE_CX_MODEL = 'UPDATE_MODEL';
const UPDATE_CX_BIT_DEPTH = 'UPDATE_CX_BIT_DEPTH';
const UPDATE_CX_LINK_COUNT = 'UPDATE_CX_LINK_COUNT';
const UPDATE_CX_LINK_SPEED = 'UPDATE_CX_LINK_SPEED';
const UPDATE_CX_RESOLUTION_PRESET = 'UPDATE_RESOLUTION_PRESET';
const UPDATE_CX_WIDTH = 'UPDATE_WIDTH';
const UPDATE_CX_HEIGHT = 'UPDATE_HEIGHT';
const UPDATE_CX_SUB_SAMPLING = 'UPDATE_CX_SUB_SAMPLING';

const flareCXActionTypes = [
    UPDATE_CX_MODEL,
    UPDATE_CX_BIT_DEPTH,
    UPDATE_CX_LINK_COUNT,
    UPDATE_CX_LINK_SPEED,
    UPDATE_CX_RESOLUTION_PRESET,
    UPDATE_CX_WIDTH,
    UPDATE_CX_HEIGHT,
    UPDATE_CX_SUB_SAMPLING
];

// Action generators
export const updateCXModel = (id, model) => ({
    type: UPDATE_CX_MODEL,
    id,
    model
});

export const updateCXBitDepth = (id, bitDepth) => ({
    type: UPDATE_CX_BIT_DEPTH,
    id,
    bitDepth
});

export const updateCXLinkCount = (id, linkCount) => ({
    type: UPDATE_CX_LINK_COUNT,
    id,
    linkCount
});

export const updateCXLinkSpeed = (id, linkSpeed) => ({
    type: UPDATE_CX_LINK_SPEED,
    id,
    linkSpeed
});

export const updateCXResolutionPreset = (id, resolutionPreset) => ({
    type: UPDATE_CX_RESOLUTION_PRESET,
    id,
    resolutionPreset
});

export const updateCXWidth = (id, width) => ({
    type: UPDATE_CX_WIDTH,
    id,
    width: width
});

export const updateCXHeight = (id, height) => ({
    type: UPDATE_CX_HEIGHT,
    id,
    height: height
});

export const updateCXSubSampling = (id, sumSampling) => ({
    type: UPDATE_CX_SUB_SAMPLING,
    id,
    sumSampling
});

// Action types
export {
    UPDATE_CX_MODEL,
    UPDATE_CX_BIT_DEPTH,
    UPDATE_CX_LINK_COUNT,
    UPDATE_CX_LINK_SPEED,
    UPDATE_CX_RESOLUTION_PRESET,
    UPDATE_CX_WIDTH,
    UPDATE_CX_HEIGHT,
    UPDATE_CX_SUB_SAMPLING,
    flareCXActionTypes
};