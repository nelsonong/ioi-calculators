const INITIALIZE_NTSC_DVR_STATE = 'INITIALIZE_NTSC_DVR_STATE';
const UPDATE_NTSC_INPUT = 'UPDATE_NTSC_INPUT';
const UPDATE_NTSC_FORMAT = 'UPDATE_NTSC_FORMAT';
const UPDATE_NTSC_COLOR = 'UPDATE_NTSC_COLOR';

const ntscActionTypes = [
  INITIALIZE_NTSC_DVR_STATE,
  UPDATE_NTSC_INPUT,
  UPDATE_NTSC_FORMAT,
  UPDATE_NTSC_COLOR,
];

// Action generators
export const initializeDVRState = (cameraId, dvrId, mode) => ({
  type: INITIALIZE_NTSC_DVR_STATE,
  cameraId,
  dvrId,
  mode,
});

export const updateInput = (cameraId, input, dvrId) => ({
  type: UPDATE_NTSC_INPUT,
  cameraId,
  input,
  dvrId,
});

export const updateFormat = (cameraId, format, dvrId) => ({
  type: UPDATE_NTSC_FORMAT,
  cameraId,
  format,
  dvrId,
});

export const updateResolutionPreset = (cameraId, format, dvrId) => ({
  type: UPDATE_NTSC_FORMAT,
  cameraId,
  format,
  dvrId,
});

export const updateColor = (cameraId, color, dvrId) => ({
  type: UPDATE_NTSC_COLOR,
  cameraId,
  color,
  dvrId,
});

// Action types
export {
  INITIALIZE_NTSC_DVR_STATE,
  UPDATE_NTSC_INPUT,
  UPDATE_NTSC_FORMAT,
  UPDATE_NTSC_COLOR,
  ntscActionTypes,
};
