const UPDATE_VICTOREM_CX_MODEL = 'UPDATE_VICTOREM_CX_MODEL';
const UPDATE_VICTOREM_CX_FORMAT = 'UPDATE_VICTOREM_CX_FORMAT';
const UPDATE_VICTOREM_CX_BIT_DEPTH = 'UPDATE_VICTOREM_CX_BIT_DEPTH';
const UPDATE_VICTOREM_CX_RESOLUTION_PRESET = 'UPDATE_VICTOREM_CX_RESOLUTION_PRESET';
const UPDATE_VICTOREM_CX_WIDTH = 'UPDATE_VICTOREM_CX_WIDTH';
const UPDATE_VICTOREM_CX_HEIGHT = 'UPDATE_VICTOREM_CX_HEIGHT';
const UPDATE_VICTOREM_CX_CAMERA_OPTION = 'UPDATE_VICTOREM_CX_CAMERA_OPTION';

const victoremCXActionTypes = [
  UPDATE_VICTOREM_CX_MODEL,
  UPDATE_VICTOREM_CX_FORMAT,
  UPDATE_VICTOREM_CX_BIT_DEPTH,
  UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
  UPDATE_VICTOREM_CX_WIDTH,
  UPDATE_VICTOREM_CX_HEIGHT,
  UPDATE_VICTOREM_CX_CAMERA_OPTION,
];

// Action generators
export const updateModel = (cameraId, model, dvrId) => ({
  type: UPDATE_VICTOREM_CX_MODEL,
  cameraId,
  model,
  dvrId,
});

export const updateFormat = (cameraId, format, dvrId) => ({
  type: UPDATE_VICTOREM_CX_FORMAT,
  cameraId,
  format,
  dvrId,
});

export const updateBitDepth = (cameraId, bitDepth, dvrId) => ({
  type: UPDATE_VICTOREM_CX_BIT_DEPTH,
  cameraId,
  bitDepth,
  dvrId,
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
  type: UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
  cameraId,
  resolutionPreset,
  dvrId,
});

export const updateWidth = (cameraId, width, dvrId) => ({
  type: UPDATE_VICTOREM_CX_WIDTH,
  cameraId,
  width,
  dvrId,
});

export const updateHeight = (cameraId, height, dvrId) => ({
  type: UPDATE_VICTOREM_CX_HEIGHT,
  cameraId,
  height,
  dvrId,
});

export const updateCameraOption = (cameraId, cameraOption, dvrId) => ({
  type: UPDATE_VICTOREM_CX_CAMERA_OPTION,
  cameraId,
  cameraOption,
  dvrId,
});

// Action types
export {
  UPDATE_VICTOREM_CX_MODEL,
  UPDATE_VICTOREM_CX_FORMAT,
  UPDATE_VICTOREM_CX_BIT_DEPTH,
  UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
  UPDATE_VICTOREM_CX_WIDTH,
  UPDATE_VICTOREM_CX_HEIGHT,
  UPDATE_VICTOREM_CX_CAMERA_OPTION,
  victoremCXActionTypes,
};
