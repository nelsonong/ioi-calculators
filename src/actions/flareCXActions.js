const UPDATE_FLARE_CX_MODEL = 'UPDATE_FLARE_CX_MODEL';
const UPDATE_FLARE_CX_BIT_DEPTH = 'UPDATE_FLARE_CX_BIT_DEPTH';
const UPDATE_FLARE_CX_LINK_COUNT = 'UPDATE_FLARE_CX_LINK_COUNT';
const UPDATE_FLARE_CX_LINK_SPEED = 'UPDATE_FLARE_CX_LINK_SPEED';
const UPDATE_FLARE_CX_RESOLUTION_PRESET = 'UPDATE_FLARE_CX_RESOLUTION_PRESET';
const UPDATE_FLARE_CX_WIDTH = 'UPDATE_FLARE_CX_WIDTH';
const UPDATE_FLARE_CX_HEIGHT = 'UPDATE_FLARE_CX_HEIGHT';
const UPDATE_FLARE_CX_SUB_SAMPLING = 'UPDATE_FLARE_CX_SUB_SAMPLING';

const flareCXActionTypes = [
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
export const updateModel = (id, model) => ({
    type: UPDATE_FLARE_CX_MODEL,
    id,
    model
});

export const updateBitDepth = (id, bitDepth) => ({
    type: UPDATE_FLARE_CX_BIT_DEPTH,
    id,
    bitDepth
});

export const updateLinkCount = (id, linkCount) => ({
    type: UPDATE_FLARE_CX_LINK_COUNT,
    id,
    linkCount
});

export const updateLinkSpeed = (id, linkSpeed) => ({
    type: UPDATE_FLARE_CX_LINK_SPEED,
    id,
    linkSpeed
});

export const updateResolutionPreset = (id, resolutionPreset) => ({
    type: UPDATE_FLARE_CX_RESOLUTION_PRESET,
    id,
    resolutionPreset
});

export const updateWidth = (id, width) => ({
    type: UPDATE_FLARE_CX_WIDTH,
    id,
    width: width
});

export const updateHeight = (id, height) => ({
    type: UPDATE_FLARE_CX_HEIGHT,
    id,
    height: height
});

export const updateSubSampling = (id, sumSampling) => ({
    type: UPDATE_FLARE_CX_SUB_SAMPLING,
    id,
    sumSampling
});

// Action types
export {
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