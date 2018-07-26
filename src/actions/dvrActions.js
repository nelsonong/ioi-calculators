const INITIALIZE_DVR_STATE = 'INITIALIZE_DVR_STATE';
const UPDATE_DVR_MODEL = 'UPDATE_DVR_MODEL';
const UPDATE_DVR_CONFIGURATION = 'UPDATE_DVR_CONFIGURATION';
const PUSH_DVR_DATA_RATE = 'PUSH_DATA_RATE';
const DELETE_DVR_DATA_RATE = 'DELETE_DATA_RATE';
const REVERT_DVR_CAMERA_STATE = 'REVERT_DVR_CAMERA_STATE';
const TOGGLE_DVR_CUSTOM_MODE = 'TOGGLE_DVR_CUSTOM_MODE';
const UPDATE_DVR_RAID = 'UPDATE_DVR_RAID';
const UPDATE_DVR_DRIVE_MODEL = 'UPDATE_DVR_DRIVE_MODEL';
const UPDATE_DVR_DRIVE_AMOUNT = 'UPDATE_DVR_DRIVE_AMOUNT';

const dvrActionTypes = [
  INITIALIZE_DVR_STATE,
  UPDATE_DVR_MODEL,
  UPDATE_DVR_CONFIGURATION,
  PUSH_DVR_DATA_RATE,
  DELETE_DVR_DATA_RATE,
  REVERT_DVR_CAMERA_STATE,
  TOGGLE_DVR_CUSTOM_MODE,
  UPDATE_DVR_RAID,
  UPDATE_DVR_DRIVE_MODEL,
  UPDATE_DVR_DRIVE_AMOUNT,
];

// Action generators
export const initializeState = dvrId => ({
  type: INITIALIZE_DVR_STATE,
  dvrId,
});

export const updateModel = (dvrId, model) => ({
  type: UPDATE_DVR_MODEL,
  dvrId,
  model,
});

export const updateConfiguration = (dvrId, configuration) => ({
  type: UPDATE_DVR_CONFIGURATION,
  dvrId,
  configuration,
});

export const pushDataRate = (dvrId, cameraId, dataRate) => ({
  type: PUSH_DVR_DATA_RATE,
  dvrId,
  cameraId,
  dataRate,
});

export const deleteDataRate = (dvrId, cameraId) => ({
  type: DELETE_DVR_DATA_RATE,
  dvrId,
  cameraId,
});

export const revertCameraState = (dvrId, cameraId, cameraState) => ({
  type: REVERT_DVR_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const toggleCustomMode = (dvrId, cameraId) => ({
  type: TOGGLE_DVR_CUSTOM_MODE,
  dvrId,
  cameraId,
});

export const updateRaid = (dvrId, raid) => ({
  type: UPDATE_DVR_RAID,
  dvrId,
  raid,
});

export const updateDriveModel = (dvrId, driveModel) => ({
  type: UPDATE_DVR_DRIVE_MODEL,
  dvrId,
  driveModel,
});

export const updateDriveAmount = (dvrId, driveAmount) => ({
  type: UPDATE_DVR_DRIVE_AMOUNT,
  dvrId,
  driveAmount,
});

// Action types
export {
  INITIALIZE_DVR_STATE,
  UPDATE_DVR_MODEL,
  UPDATE_DVR_CONFIGURATION,
  PUSH_DVR_DATA_RATE,
  DELETE_DVR_DATA_RATE,
  REVERT_DVR_CAMERA_STATE,
  TOGGLE_DVR_CUSTOM_MODE,
  UPDATE_DVR_RAID,
  UPDATE_DVR_DRIVE_MODEL,
  UPDATE_DVR_DRIVE_AMOUNT,
  dvrActionTypes,
};
