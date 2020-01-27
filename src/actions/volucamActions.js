const UPDATE_VOLUCAM_MODEL = 'UPDATE_VOLUCAM_MODEL';
const INITIALIZE_VOLUCAM_DVR_STATE = 'INITIALIZE_VOLUCAM_DVR_STATE';
const UPDATE_VOLUCAM_ADC_BIT_DEPTH = 'UPDATE_VOLUCAM_ADC_BIT_DEPTH';
const UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH = 'UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH';
const UPDATE_VOLUCAM_RESOLUTION_PRESET = 'UPDATE_VOLUCAM_RESOLUTION_PRESET';
const UPDATE_VOLUCAM_WIDTH = 'UPDATE_VOLUCAM_WIDTH';
const UPDATE_VOLUCAM_HEIGHT = 'UPDATE_VOLUCAM_HEIGHT';
const UPDATE_VOLUCAM_SUBSAMPLING_BINNING = 'UPDATE_VOLUCAM_SUBSAMPLING_BINNING';
const UPDATE_VOLUCAM_SENSOR_DRIVE_MODE = 'UPDATE_VOLUCAM_SENSOR_DRIVE_MODE';
const UPDATE_VOLUCAM_DRIVE_MODEL = 'UPDATE_VOLUCAM_DRIVE_MODEL';
const UPDATE_VOLUCAM_FRAME_RATE = 'UPDATE_VOLUCAM_FRAME_RATE';
const RESET_VOLUCAM_FRAME_RATE = 'RESET_VOLUCAM_FRAME_RATE';

const volucamActionTypes = [
  INITIALIZE_VOLUCAM_DVR_STATE,
  UPDATE_VOLUCAM_MODEL,
  UPDATE_VOLUCAM_ADC_BIT_DEPTH,
  UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH,
  UPDATE_VOLUCAM_RESOLUTION_PRESET,
  UPDATE_VOLUCAM_WIDTH,
  UPDATE_VOLUCAM_HEIGHT,
  UPDATE_VOLUCAM_SUBSAMPLING_BINNING,
  UPDATE_VOLUCAM_SENSOR_DRIVE_MODE,
  UPDATE_VOLUCAM_DRIVE_MODEL,
  UPDATE_VOLUCAM_FRAME_RATE,
  RESET_VOLUCAM_FRAME_RATE,
];

// Action generators
export const initializeVolucamState = cameraId => ({
  type: INITIALIZE_VOLUCAM_DVR_STATE,
  cameraId,
});

export const updateModel = (cameraId, model) => ({
  type: UPDATE_VOLUCAM_MODEL,
  cameraId,
  model,
});

export const updateADCBitDepth = (cameraId, adcBitDepth) => ({
  type: UPDATE_VOLUCAM_ADC_BIT_DEPTH,
  cameraId,
  adcBitDepth,
});

export const updateOutputBitDepth = (cameraId, outputBitDepth) => ({
  type: UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH,
  cameraId,
  outputBitDepth,
});

export const updateResolutionPreset = (cameraId, resolutionPreset) => ({
  type: UPDATE_VOLUCAM_RESOLUTION_PRESET,
  cameraId,
  resolutionPreset,
});

export const updateWidth = (cameraId, width) => ({
  type: UPDATE_VOLUCAM_WIDTH,
  cameraId,
  width,
});

export const updateHeight = (cameraId, height) => ({
  type: UPDATE_VOLUCAM_HEIGHT,
  cameraId,
  height,
});

export const updateSensorDriveMode = (cameraId, sensorDriveMode) => ({
  type: UPDATE_VOLUCAM_SENSOR_DRIVE_MODE,
  cameraId,
  sensorDriveMode,
});

export const updateDriveModel = (cameraId, driveModel) => ({
  type: UPDATE_VOLUCAM_DRIVE_MODEL,
  cameraId,
  driveModel,
});

export const updateFrameRate = (cameraId, frameRate) => ({
  type: UPDATE_VOLUCAM_FRAME_RATE,
  cameraId,
  frameRate,
});

export const resetFrameRate = cameraId => ({
  type: RESET_VOLUCAM_FRAME_RATE,
  cameraId,
});

// Action types
export {
  INITIALIZE_VOLUCAM_DVR_STATE,
  UPDATE_VOLUCAM_MODEL,
  UPDATE_VOLUCAM_ADC_BIT_DEPTH,
  UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH,
  UPDATE_VOLUCAM_RESOLUTION_PRESET,
  UPDATE_VOLUCAM_WIDTH,
  UPDATE_VOLUCAM_HEIGHT,
  UPDATE_VOLUCAM_SUBSAMPLING_BINNING,
  UPDATE_VOLUCAM_SENSOR_DRIVE_MODE,
  UPDATE_VOLUCAM_DRIVE_MODEL,
  UPDATE_VOLUCAM_FRAME_RATE,
  RESET_VOLUCAM_FRAME_RATE,
  volucamActionTypes,
};
