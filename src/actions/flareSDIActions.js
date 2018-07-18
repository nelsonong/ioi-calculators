const INITIALIZE_FLARE_SDI_DVR_STATE = 'INITIALIZE_FLARE_SDI_DVR_STATE';
const UPDATE_FLARE_SDI_MODEL = 'UPDATE_FLARE_SDI_MODEL';
const UPDATE_FLARE_SDI_INTERFACE = 'UPDATE_FLARE_SDI_INTERFACE';
const UPDATE_FLARE_SDI_RESOLUTION = 'UPDATE_FLARE_SDI_RESOLUTION';
const UPDATE_FLARE_SDI_COLOR = 'UPDATE_FLARE_SDI_COLOR';
const UPDATE_FLARE_SDI_FRAME_RATE = 'UPDATE_FLARE_SDI_FRAME_RATE';

const flareSDIActionTypes = [
    INITIALIZE_FLARE_SDI_DVR_STATE,
    UPDATE_FLARE_SDI_MODEL,
    UPDATE_FLARE_SDI_INTERFACE,
    UPDATE_FLARE_SDI_RESOLUTION,
    UPDATE_FLARE_SDI_COLOR,
    UPDATE_FLARE_SDI_FRAME_RATE
];

// Action generators
export const initializeDVRState = (id, dvrId, mode) => ({
    type: INITIALIZE_FLARE_SDI_DVR_STATE,
    id,
    dvrId,
    mode
});

export const updateModel = (id, model, dvrId) => ({
    type: UPDATE_FLARE_SDI_MODEL,
    id,
    model,
    dvrId
});

export const updateInterface = (id, sdiInterface, dvrId) => ({
    type: UPDATE_FLARE_SDI_INTERFACE,
    id,
    sdiInterface,
    dvrId
});

export const updateResolution = (id, resolution, dvrId) => ({
    type: UPDATE_FLARE_SDI_RESOLUTION,
    id,
    resolution,
    dvrId
});

export const updateColor = (id, color, dvrId) => ({
    type: UPDATE_FLARE_SDI_COLOR,
    id,
    color,
    dvrId
});

export const updateFrameRate = (id, frameRate, dvrId) => ({
    type: UPDATE_FLARE_SDI_FRAME_RATE,
    id,
    frameRate,
    dvrId
});

// Action types
export {
    INITIALIZE_FLARE_SDI_DVR_STATE,
    UPDATE_FLARE_SDI_MODEL,
    UPDATE_FLARE_SDI_INTERFACE,
    UPDATE_FLARE_SDI_RESOLUTION,
    UPDATE_FLARE_SDI_COLOR,
    UPDATE_FLARE_SDI_FRAME_RATE,
    flareSDIActionTypes
};