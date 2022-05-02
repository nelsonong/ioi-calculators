const UPDATE_VICTOREM_CX_MODEL = 'UPDATE_VICTOREM_CX_MODEL';
const INITIALIZE_VICTOREM_CX_DVR_STATE = 'INITIALIZE_VICTOREM_CX_DVR_STATE';
const UPDATE_VICTOREM_CX_FORMAT = 'UPDATE_VICTOREM_CX_FORMAT';
const UPDATE_VICTOREM_CX_ADC_BIT_DEPTH = 'UPDATE_VICTOREM_CX_ADC_BIT_DEPTH';
const UPDATE_VICTOREM_CX_OUTPUT_BIT_DEPTH = 'UPDATE_VICTOREM_CX_OUTPUT_BIT_DEPTH';
const UPDATE_VICTOREM_CX_RESOLUTION_PRESET = 'UPDATE_VICTOREM_CX_RESOLUTION_PRESET';
const UPDATE_VICTOREM_CX_WIDTH = 'UPDATE_VICTOREM_CX_WIDTH';
const UPDATE_VICTOREM_CX_HEIGHT = 'UPDATE_VICTOREM_CX_HEIGHT';
const UPDATE_VICTOREM_CX_SUBSAMPLING_BINNING = 'UPDATE_VICTOREM_CX_SUBSAMPLING_BINNING';
const UPDATE_VICTOREM_CX_SENSOR_DRIVE_MODE = 'UPDATE_VICTOREM_CX_SENSOR_DRIVE_MODE';
const UPDATE_VICTOREM_CX_FRAME_RATE = 'UPDATE_VICTOREM_CX_FRAME_RATE';
const RESET_VICTOREM_CX_FRAME_RATE = 'RESET_VICTOREM_CX_FRAME_RATE';

const victoremCXActionTypes = [
  INITIALIZE_VICTOREM_CX_DVR_STATE,
  UPDATE_VICTOREM_CX_MODEL,
  UPDATE_VICTOREM_CX_FORMAT,
  UPDATE_VICTOREM_CX_ADC_BIT_DEPTH,
  UPDATE_VICTOREM_CX_OUTPUT_BIT_DEPTH,
  UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
  UPDATE_VICTOREM_CX_WIDTH,
  UPDATE_VICTOREM_CX_HEIGHT,
  UPDATE_VICTOREM_CX_SUBSAMPLING_BINNING,
  UPDATE_VICTOREM_CX_SENSOR_DRIVE_MODE,
  UPDATE_VICTOREM_CX_FRAME_RATE,
  RESET_VICTOREM_CX_FRAME_RATE,
];

// Action generators
export const initializeDVRState = (cameraId, mode, dvrId) => ({
  type: INITIALIZE_VICTOREM_CX_DVR_STATE,
  cameraId,
  mode,
  dvrId,
});

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

export const updateADCBitDepth = (cameraId, adcBitDepth, dvrId) => ({
  type: UPDATE_VICTOREM_CX_ADC_BIT_DEPTH,
  cameraId,
  adcBitDepth,
  dvrId,
});

export const updateOutputBitDepth = (cameraId, outputBitDepth, dvrId) => ({
  type: UPDATE_VICTOREM_CX_OUTPUT_BIT_DEPTH,
  cameraId,
  outputBitDepth,
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

export const updateSubSamplingBinningMode = (cameraId, subSamplingBinning, dvrId) => ({
  type: UPDATE_VICTOREM_CX_SUBSAMPLING_BINNING,
  cameraId,
  subSamplingBinning,
  dvrId,
});

export const updateSensorDriveMode = (cameraId, sensorDriveMode, dvrId) => ({
  type: UPDATE_VICTOREM_CX_SENSOR_DRIVE_MODE,
  cameraId,
  sensorDriveMode,
  dvrId,
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
  type: UPDATE_VICTOREM_CX_FRAME_RATE,
  cameraId,
  frameRate,
  dvrId,
});

export const resetFrameRate = (cameraId, dvrId) => ({
  type: RESET_VICTOREM_CX_FRAME_RATE,
  cameraId,
  dvrId,
});

// Action types
export {
  INITIALIZE_VICTOREM_CX_DVR_STATE,
  UPDATE_VICTOREM_CX_MODEL,
  UPDATE_VICTOREM_CX_FORMAT,
  UPDATE_VICTOREM_CX_ADC_BIT_DEPTH,
  UPDATE_VICTOREM_CX_OUTPUT_BIT_DEPTH,
  UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
  UPDATE_VICTOREM_CX_WIDTH,
  UPDATE_VICTOREM_CX_HEIGHT,
  UPDATE_VICTOREM_CX_SUBSAMPLING_BINNING,
  UPDATE_VICTOREM_CX_SENSOR_DRIVE_MODE,
  UPDATE_VICTOREM_CX_FRAME_RATE,
  RESET_VICTOREM_CX_FRAME_RATE,
  victoremCXActionTypes,
};
