const UPDATE_REDWOOD_MODEL = 'UPDATE_REDWOOD_MODEL';
const INITIALIZE_REDWOOD_DVR_STATE = 'INITIALIZE_REDWOOD_DVR_STATE';
const UPDATE_REDWOOD_FORMAT = 'UPDATE_REDWOOD_FORMAT';
const UPDATE_REDWOOD_ADC_BIT_DEPTH = 'UPDATE_REDWOOD_ADC_BIT_DEPTH';
const UPDATE_REDWOOD_OUTPUT_BIT_DEPTH = 'UPDATE_REDWOOD_OUTPUT_BIT_DEPTH';
const UPDATE_REDWOOD_RESOLUTION_PRESET = 'UPDATE_REDWOOD_RESOLUTION_PRESET';
const UPDATE_REDWOOD_WIDTH = 'UPDATE_REDWOOD_WIDTH';
const UPDATE_REDWOOD_HEIGHT = 'UPDATE_REDWOOD_HEIGHT';
const UPDATE_REDWOOD_DUAL_GAIN = 'UPDATE_REDWOOD_DUAL_GAIN';
const UPDATE_REDWOOD_SUBSAMPLING_BINNING = 'UPDATE_REDWOOD_SUBSAMPLING_BINNING';
const UPDATE_REDWOOD_SENSOR_DRIVE_MODE = 'UPDATE_REDWOOD_SENSOR_DRIVE_MODE';
const UPDATE_REDWOOD_DRIVE_MODEL = 'UPDATE_REDWOOD_DRIVE_MODEL';
const UPDATE_REDWOOD_FRAME_RATE = 'UPDATE_REDWOOD_FRAME_RATE';
const RESET_REDWOOD_FRAME_RATE = 'RESET_REDWOOD_FRAME_RATE';

const redwoodActionTypes = [
  INITIALIZE_REDWOOD_DVR_STATE,
  UPDATE_REDWOOD_MODEL,
  UPDATE_REDWOOD_FORMAT,
  UPDATE_REDWOOD_ADC_BIT_DEPTH,
  UPDATE_REDWOOD_OUTPUT_BIT_DEPTH,
  UPDATE_REDWOOD_RESOLUTION_PRESET,
  UPDATE_REDWOOD_WIDTH,
  UPDATE_REDWOOD_HEIGHT,
  UPDATE_REDWOOD_DUAL_GAIN,
  UPDATE_REDWOOD_SUBSAMPLING_BINNING,
  UPDATE_REDWOOD_SENSOR_DRIVE_MODE,
  UPDATE_REDWOOD_DRIVE_MODEL,
  UPDATE_REDWOOD_FRAME_RATE,
  RESET_REDWOOD_FRAME_RATE,
];

// Action generators
export const initializeDVRState = (cameraId, mode, dvrId) => ({
  type: INITIALIZE_REDWOOD_DVR_STATE,
  cameraId,
  mode,
  dvrId,
});

export const updateModel = (cameraId, model, dvrId) => ({
  type: UPDATE_REDWOOD_MODEL,
  cameraId,
  model,
  dvrId,
});

export const updateFormat = (cameraId, format, dvrId) => ({
  type: UPDATE_REDWOOD_FORMAT,
  cameraId,
  format,
  dvrId,
});

export const updateADCBitDepth = (cameraId, adcBitDepth, dvrId) => ({
  type: UPDATE_REDWOOD_ADC_BIT_DEPTH,
  cameraId,
  adcBitDepth,
  dvrId,
});

export const updateOutputBitDepth = (cameraId, outputBitDepth, dvrId) => ({
  type: UPDATE_REDWOOD_OUTPUT_BIT_DEPTH,
  cameraId,
  outputBitDepth,
  dvrId,
});

export const updateDualGain = (cameraId, dualGain) => ({
  type: UPDATE_REDWOOD_DUAL_GAIN,
  cameraId,
  dualGain,
});

export const updateResolutionPreset = (cameraId, resolutionPreset, dvrId) => ({
  type: UPDATE_REDWOOD_RESOLUTION_PRESET,
  cameraId,
  resolutionPreset,
  dvrId,
});

export const updateWidth = (cameraId, width, dvrId) => ({
  type: UPDATE_REDWOOD_WIDTH,
  cameraId,
  width,
  dvrId,
});

export const updateHeight = (cameraId, height, dvrId) => ({
  type: UPDATE_REDWOOD_HEIGHT,
  cameraId,
  height,
  dvrId,
});

export const updateSubSamplingBinningMode = (cameraId, subSamplingBinning, dvrId) => ({
  type: UPDATE_REDWOOD_SUBSAMPLING_BINNING,
  cameraId,
  subSamplingBinning,
  dvrId,
});

export const updateSensorDriveMode = (cameraId, sensorDriveMode, dvrId) => ({
  type: UPDATE_REDWOOD_SENSOR_DRIVE_MODE,
  cameraId,
  sensorDriveMode,
  dvrId,
});

export const updateDriveModel = (cameraId, driveModel, dvrId) => ({
  type: UPDATE_REDWOOD_DRIVE_MODEL,
  cameraId,
  driveModel,
  dvrId,
});

export const updateFrameRate = (cameraId, frameRate, dvrId) => ({
  type: UPDATE_REDWOOD_FRAME_RATE,
  cameraId,
  frameRate,
  dvrId,
});

export const resetFrameRate = (cameraId, dvrId) => ({
  type: RESET_REDWOOD_FRAME_RATE,
  cameraId,
  dvrId,
});

// Action types
export {
  INITIALIZE_REDWOOD_DVR_STATE,
  UPDATE_REDWOOD_MODEL,
  UPDATE_REDWOOD_FORMAT,
  UPDATE_REDWOOD_ADC_BIT_DEPTH,
  UPDATE_REDWOOD_OUTPUT_BIT_DEPTH,
  UPDATE_REDWOOD_RESOLUTION_PRESET,
  UPDATE_REDWOOD_WIDTH,
  UPDATE_REDWOOD_HEIGHT,
  UPDATE_REDWOOD_DUAL_GAIN,
  UPDATE_REDWOOD_SUBSAMPLING_BINNING,
  UPDATE_REDWOOD_SENSOR_DRIVE_MODE,
  UPDATE_REDWOOD_DRIVE_MODEL,
  UPDATE_REDWOOD_FRAME_RATE,
  RESET_REDWOOD_FRAME_RATE,
  redwoodActionTypes,
};
