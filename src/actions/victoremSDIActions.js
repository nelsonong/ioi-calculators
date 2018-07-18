const INITIALIZE_VICTOREM_SDI_DVR_STATE = 'INITIALIZE_VICTOREM_SDI_DVR_STATE';
const UPDATE_VICTOREM_SDI_MODEL = 'UPDATE_VICTOREM_SDI_MODEL';
const UPDATE_VICTOREM_SDI_INTERFACE = 'UPDATE_VICTOREM_SDI_INTERFACE';
const UPDATE_VICTOREM_SDI_RESOLUTION = 'UPDATE_VICTOREM_SDI_RESOLUTION';
const UPDATE_VICTOREM_SDI_COLOR = 'UPDATE_VICTOREM_SDI_COLOR';
const UPDATE_VICTOREM_SDI_FRAME_RATE = 'UPDATE_VICTOREM_SDI_FRAME_RATE';

const victoremSDIActionTypes = [
    INITIALIZE_VICTOREM_SDI_DVR_STATE,
    UPDATE_VICTOREM_SDI_MODEL,
    UPDATE_VICTOREM_SDI_INTERFACE,
    UPDATE_VICTOREM_SDI_RESOLUTION,
    UPDATE_VICTOREM_SDI_COLOR,
    UPDATE_VICTOREM_SDI_FRAME_RATE
];

// Action generators
export const initializeDVRState = (id, inDVR, mode) => ({
    type: INITIALIZE_VICTOREM_SDI_DVR_STATE,
    id,
    inDVR,
    mode
});

export const updateModel = (id, model) => ({
    type: UPDATE_VICTOREM_SDI_MODEL,
    id,
    model
});

export const updateInterface = (id, sdiInterface) => ({
    type: UPDATE_VICTOREM_SDI_INTERFACE,
    id,
    sdiInterface
});

export const updateResolution = (id, resolution) => ({
    type: UPDATE_VICTOREM_SDI_RESOLUTION,
    id,
    resolution
});

export const updateColor = (id, color) => ({
    type: UPDATE_VICTOREM_SDI_COLOR,
    id,
    color
});

export const updateFrameRate = (id, frameRate) => ({
    type: UPDATE_VICTOREM_SDI_FRAME_RATE,
    id,
    frameRate
});

// Action types
export {
    INITIALIZE_VICTOREM_SDI_DVR_STATE,
    UPDATE_VICTOREM_SDI_MODEL,
    UPDATE_VICTOREM_SDI_INTERFACE,
    UPDATE_VICTOREM_SDI_RESOLUTION,
    UPDATE_VICTOREM_SDI_COLOR,
    UPDATE_VICTOREM_SDI_FRAME_RATE,
    victoremSDIActionTypes
};