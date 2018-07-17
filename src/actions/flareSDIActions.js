const INITIALIZE_SDI_DVR_STATE = 'INITIALIZE_SDI_DVR_STATE';
const UPDATE_SDI_MODEL = 'UPDATE_SDI_MODEL';
const UPDATE_SDI_INTERFACE = 'UPDATE_SDI_INTERFACE';
const UPDATE_SDI_LINK = 'UPDATE_SDI_LINK';
const UPDATE_SDI_RESOLUTION = 'UPDATE_SDI_RESOLUTION';
const UPDATE_SDI_COLOR = 'UPDATE_SDI_COLOR';
const UPDATE_SDI_FRAME_RATE = 'UPDATE_SDI_FRAME_RATE';

const flareSDIActionTypes = [
    INITIALIZE_SDI_DVR_STATE,
    UPDATE_SDI_MODEL,
    UPDATE_SDI_INTERFACE,
    UPDATE_SDI_RESOLUTION,
    UPDATE_SDI_COLOR,
    UPDATE_SDI_FRAME_RATE,
    UPDATE_SDI_LINK
];

// Action generators
export const initializeSDIDVRState = (id, inDVR, mode) => ({
    type: INITIALIZE_SDI_DVR_STATE,
    id,
    inDVR,
    mode
});

export const updateSDIModel = (id, model) => ({
    type: UPDATE_SDI_MODEL,
    id,
    model
});

export const updateSDIInterface = (id, sdiInterface) => ({
    type: UPDATE_SDI_INTERFACE,
    id,
    sdiInterface
});

export const updateSDILink = (id, link) => ({
    type: UPDATE_SDI_LINK,
    id,
    link
});

export const updateSDIResolution = (id, resolution) => ({
    type: UPDATE_SDI_RESOLUTION,
    id,
    resolution
});

export const updateSDIColor = (id, color) => ({
    type: UPDATE_SDI_COLOR,
    id,
    color
});

export const updateSDIFrameRate = (id, frameRate) => ({
    type: UPDATE_SDI_FRAME_RATE,
    id,
    frameRate
});

// Action types
export {
    INITIALIZE_SDI_DVR_STATE,
    UPDATE_SDI_MODEL,
    UPDATE_SDI_INTERFACE,
    UPDATE_SDI_RESOLUTION,
    UPDATE_SDI_COLOR,
    UPDATE_SDI_FRAME_RATE,
    UPDATE_SDI_LINK,
    flareSDIActionTypes
};