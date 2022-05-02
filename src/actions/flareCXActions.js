const INITIALIZE_FLARE_CX_DVR_STATE = 'INITIALIZE_FLARE_CX_DVR_STATE';
const UPDATE_FLARE_CX_MODEL = 'UPDATE_FLARE_CX_MODEL';
const UPDATE_FLARE_CX_BIT_DEPTH = 'UPDATE_FLARE_CX_BIT_DEPTH';
const UPDATE_FLARE_CX_LINK_COUNT = 'UPDATE_FLARE_CX_LINK_COUNT';
const UPDATE_FLARE_CX_LINK_SPEED = 'UPDATE_FLARE_CX_LINK_SPEED';
const UPDATE_FLARE_CX_RESOLUTION_PRESET = 'UPDATE_FLARE_CX_RESOLUTION_PRESET';
const UPDATE_FLARE_CX_WIDTH = 'UPDATE_FLARE_CX_WIDTH';
const UPDATE_FLARE_CX_HEIGHT = 'UPDATE_FLARE_CX_HEIGHT';
const UPDATE_FLARE_CX_SUB_SAMPLING = 'UPDATE_FLARE_CX_SUB_SAMPLING';
const UPDATE_FLARE_CX_FRAME_RATE = 'UPDATE_FLARE_CX_FRAME_RATE';
const RESET_FLARE_CX_FRAME_RATE = 'RESET_FLARE_CX_FRAME_RATE';

const flareCXActionTypes = [
  INITIALIZE_FLARE_CX_DVR_STATE,
  UPDATE_FLARE_CX_MODEL,
  UPDATE_FLARE_CX_BIT_DEPTH,
  UPDATE_FLARE_CX_LINK_COUNT,
  UPDATE_FLARE_CX_LINK_SPEED,
  UPDATE_FLARE_CX_RESOLUTION_PRESET,
  UPDATE_FLARE_CX_WIDTH,
  UPDATE_FLARE_CX_HEIGHT,
  UPDATE_FLARE_CX_SUB_SAMPLING,
  UPDATE_FLARE_CX_FRAME_RATE,
  RESET_FLARE_CX_FRAME_RATE,
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
  type: INITIALIZE_FLARE_CX_DVR_STATE,
  cameraId,
  dvrId,
  mode,
});

export const updateModel = (cameraId, model, dvrId) => ({
  type: UPDATE_FLARE_CX_MODEL,
  cameraId,
  model,
  dvrId,
});

export const updateBitDepth = (cameraId, bitDepth, dvrId) => ({
  type: UPDATE_FLARE_CX_BIT_DEPTH,
  cameraId,
  bitDepth,
  dvrId,
});

export const updateLinkCount = (cameraId, linkCount, dvrId) => ({
  type: UPDATE_FLARE_CX_LINK_COUNT,
  cameraId,
  linkCount,
  dvrId,
});

export const updateLinkSpeed = (cameraId, linkSpeed, dvrId) => ({
  type: UPDATE_FLARE_CX_LINK_SPEED,
  cameraId,
  linkSpeed,
  dvrId,
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
  type: UPDATE_FLARE_CX_RESOLUTION_PRESET,
  cameraId,
  resolutionPreset,
  dvrId,
});

export const updateWidth = (cameraId, width, dvrId) => ({
  type: UPDATE_FLARE_CX_WIDTH,
  cameraId,
  width,
  dvrId,
});

export const updateHeight = (cameraId, height, dvrId) => ({
  type: UPDATE_FLARE_CX_HEIGHT,
  cameraId,
  height,
  dvrId,
});

export const updateSubSampling = (cameraId, subSampling, dvrId) => ({
  type: UPDATE_FLARE_CX_SUB_SAMPLING,
  cameraId,
  subSampling,
  dvrId,
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
  type: UPDATE_FLARE_CX_FRAME_RATE,
  cameraId,
  frameRate,
  dvrId,
});

export const resetFrameRate = (cameraId, dvrId) => ({
  type: RESET_FLARE_CX_FRAME_RATE,
  cameraId,
  dvrId,
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
  UPDATE_FLARE_CX_FRAME_RATE,
  RESET_FLARE_CX_FRAME_RATE,
  flareCXActionTypes,
};
