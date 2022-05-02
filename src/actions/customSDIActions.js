const INITIALIZE_CUSTOM_SDI_DVR_STATE = 'INITIALIZE_CUSTOM_SDI_DVR_STATE';
const UPDATE_CUSTOM_SDI_INTERFACE = 'UPDATE_CUSTOM_SDI_INTERFACE';
const UPDATE_CUSTOM_SDI_RESOLUTION = 'UPDATE_CUSTOM_SDI_RESOLUTION';
const UPDATE_CUSTOM_SDI_COLOR = 'UPDATE_CUSTOM_SDI_COLOR';
const UPDATE_CUSTOM_SDI_FRAME_RATE = 'UPDATE_CUSTOM_SDI_FRAME_RATE';

const customSDIActionTypes = [
  INITIALIZE_CUSTOM_SDI_DVR_STATE,
  UPDATE_CUSTOM_SDI_INTERFACE,
  UPDATE_CUSTOM_SDI_RESOLUTION,
  UPDATE_CUSTOM_SDI_COLOR,
  UPDATE_CUSTOM_SDI_FRAME_RATE,
];

// Action generators
export const initializeDVRState = (cameraId, mode, model, dvrId) => ({
  type: INITIALIZE_CUSTOM_SDI_DVR_STATE,
  cameraId,
  mode,
  model,
  dvrId,
});

export const updateInterface = (cameraId, sdiInterface, dvrId) => ({
  type: UPDATE_CUSTOM_SDI_INTERFACE,
  cameraId,
  sdiInterface,
  dvrId,
});

export const updateResolution = (cameraId, resolution, dvrId) => ({
  type: UPDATE_CUSTOM_SDI_RESOLUTION,
  cameraId,
  resolution,
  dvrId,
});

export const updateColor = (cameraId, color, dvrId) => ({
  type: UPDATE_CUSTOM_SDI_COLOR,
  cameraId,
  color,
  dvrId,
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
  type: UPDATE_CUSTOM_SDI_FRAME_RATE,
  cameraId,
  frameRate,
  dvrId,
});

// Action types
export {
  INITIALIZE_CUSTOM_SDI_DVR_STATE,
  UPDATE_CUSTOM_SDI_INTERFACE,
  UPDATE_CUSTOM_SDI_RESOLUTION,
  UPDATE_CUSTOM_SDI_COLOR,
  UPDATE_CUSTOM_SDI_FRAME_RATE,
  customSDIActionTypes,
};
