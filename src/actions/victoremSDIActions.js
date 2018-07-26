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
export const initializeDVRState = (cameraId, mode, dvrId) => ({
  type: INITIALIZE_VICTOREM_SDI_DVR_STATE,
  cameraId,
  mode,
  dvrId,
});

export const updateModel = (cameraId, model, dvrId) => ({
  type: UPDATE_VICTOREM_SDI_MODEL,
  cameraId,
  model,
  dvrId,
});

export const updateInterface = (cameraId, sdiInterface, dvrId) => ({
  type: UPDATE_VICTOREM_SDI_INTERFACE,
  cameraId,
  sdiInterface,
  dvrId,
});

export const updateResolution = (cameraId, resolution, dvrId) => ({
  type: UPDATE_VICTOREM_SDI_RESOLUTION,
  cameraId,
  resolution,
  dvrId,
});

export const updateColor = (cameraId, color, dvrId) => ({
  type: UPDATE_VICTOREM_SDI_COLOR,
  cameraId,
  color,
  dvrId,
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
  type: UPDATE_VICTOREM_SDI_FRAME_RATE,
  cameraId,
  frameRate,
  dvrId,
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
