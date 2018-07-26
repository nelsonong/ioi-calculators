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
  UPDATE_FLARE_SDI_FRAME_RATE,
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
  type: INITIALIZE_FLARE_SDI_DVR_STATE,
  cameraId,
  dvrId,
  mode,
});

export const updateModel = (cameraId, model, dvrId) => ({
  type: UPDATE_FLARE_SDI_MODEL,
  cameraId,
  model,
  dvrId,
});

export const updateInterface = (cameraId, sdiInterface, dvrId) => ({
  type: UPDATE_FLARE_SDI_INTERFACE,
  cameraId,
  sdiInterface,
  dvrId,
});

export const updateResolution = (cameraId, resolution, dvrId) => ({
  type: UPDATE_FLARE_SDI_RESOLUTION,
  cameraId,
  resolution,
  dvrId,
});

export const updateColor = (cameraId, color, dvrId) => ({
  type: UPDATE_FLARE_SDI_COLOR,
  cameraId,
  color,
  dvrId,
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
  type: UPDATE_FLARE_SDI_FRAME_RATE,
  cameraId,
  frameRate,
  dvrId,
});

// Action types
export {
  INITIALIZE_FLARE_SDI_DVR_STATE,
  UPDATE_FLARE_SDI_MODEL,
  UPDATE_FLARE_SDI_INTERFACE,
  UPDATE_FLARE_SDI_RESOLUTION,
  UPDATE_FLARE_SDI_COLOR,
  UPDATE_FLARE_SDI_FRAME_RATE,
  flareSDIActionTypes,
};
