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
  UPDATE_VICTOREM_SDI_FRAME_RATE,
];

// Action generators
export const initializeDVRState = (cameraId, inDVR, mode) => ({
  type: INITIALIZE_VICTOREM_SDI_DVR_STATE,
  cameraId,
  inDVR,
  mode,
});

export const updateModel = (cameraId, model) => ({
  type: UPDATE_VICTOREM_SDI_MODEL,
  cameraId,
  model,
});

export const updateInterface = (cameraId, sdiInterface) => ({
  type: UPDATE_VICTOREM_SDI_INTERFACE,
  cameraId,
  sdiInterface,
});

export const updateResolution = (cameraId, resolution) => ({
  type: UPDATE_VICTOREM_SDI_RESOLUTION,
  cameraId,
  resolution,
});

export const updateColor = (cameraId, color) => ({
  type: UPDATE_VICTOREM_SDI_COLOR,
  cameraId,
  color,
});

export const updateFrameRate = (cameraId, frameRate) => ({
  type: UPDATE_VICTOREM_SDI_FRAME_RATE,
  cameraId,
  frameRate,
});

// Action types
export {
  INITIALIZE_VICTOREM_SDI_DVR_STATE,
  UPDATE_VICTOREM_SDI_MODEL,
  UPDATE_VICTOREM_SDI_INTERFACE,
  UPDATE_VICTOREM_SDI_RESOLUTION,
  UPDATE_VICTOREM_SDI_COLOR,
  UPDATE_VICTOREM_SDI_FRAME_RATE,
  victoremSDIActionTypes,
};
