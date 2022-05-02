const INITIALIZE_RODEO_STATE = 'INITIALIZE_RODEO_STATE';
const UPDATE_RODEO_MODEL = 'UPDATE_RODEO_MODEL';
const UPDATE_RODEO_CONFIGURATION = 'UPDATE_RODEO_CONFIGURATION';
const PUSH_RODEO_DATA_RATE = 'PUSH_RODEO_DATA_RATE';
const DELETE_RODEO_DATA_RATE = 'DELETE_RODEO_DATA_RATE';
const REVERT_RODEO_CAMERA_STATE = 'REVERT_RODEO_CAMERA_STATE';
const COPY_RODEO_CAMERA_STATE = 'COPY_RODEO_CAMERA_STATE';
const PASTE_RODEO_CAMERA_STATE = 'PASTE_RODEO_CAMERA_STATE';
const DUPLICATE_RODEO_CAMERA_STATE = 'DUPLICATE_RODEO_CAMERA_STATE';
const TOGGLE_RODEO_CAMERA_TYPE = 'TOGGLE_RODEO_CAMERA_TYPE';
const UPDATE_RODEO_RAID = 'UPDATE_RODEO_RAID';
const UPDATE_RODEO_DRIVE_MODEL = 'UPDATE_RODEO_DRIVE_MODEL';
const UPDATE_RODEO_DRIVE_AMOUNT = 'UPDATE_RODEO_DRIVE_AMOUNT';

const rodeoActionTypes = [
  INITIALIZE_RODEO_STATE,
  UPDATE_RODEO_MODEL,
  UPDATE_RODEO_CONFIGURATION,
  PUSH_RODEO_DATA_RATE,
  DELETE_RODEO_DATA_RATE,
  REVERT_RODEO_CAMERA_STATE,
  COPY_RODEO_CAMERA_STATE,
  PASTE_RODEO_CAMERA_STATE,
  DUPLICATE_RODEO_CAMERA_STATE,
  TOGGLE_RODEO_CAMERA_TYPE,
  UPDATE_RODEO_RAID,
  UPDATE_RODEO_DRIVE_MODEL,
  UPDATE_RODEO_DRIVE_AMOUNT,
];

// Action generators
export const initializeState = dvrId => ({
  type: INITIALIZE_RODEO_STATE,
  dvrId,
});

export const updateModel = (dvrId, model) => ({
  type: UPDATE_RODEO_MODEL,
  dvrId,
  model,
});

export const updateConfiguration = (dvrId, configuration) => ({
  type: UPDATE_RODEO_CONFIGURATION,
  dvrId,
  configuration,
});

export const pushDataRate = (dvrId, cameraId, dataRate) => ({
  type: PUSH_RODEO_DATA_RATE,
  dvrId,
  cameraId,
  dataRate,
});

export const deleteDataRate = (dvrId, cameraId) => ({
  type: DELETE_RODEO_DATA_RATE,
  dvrId,
  cameraId,
});

export const revertCameraState = (dvrId, cameraId, cameraState) => ({
  type: REVERT_RODEO_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const copyCameraState = (dvrId, cameraId, cameraState) => ({
  type: COPY_RODEO_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const pasteCameraState = (dvrId, cameraId, cameraState) => ({
  type: PASTE_RODEO_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const duplicateCameraState = (dvrId, cameraId, cameraState) => ({
  type: DUPLICATE_RODEO_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const toggleCamera = (dvrId, cameraId, cameraType) => ({
  type: TOGGLE_RODEO_CAMERA_TYPE,
  dvrId,
  cameraId,
  cameraType,
});

export const updateRaid = (dvrId, raid) => ({
  type: UPDATE_RODEO_RAID,
  dvrId,
  raid,
});

export const updateDriveModel = (dvrId, driveModel) => ({
  type: UPDATE_RODEO_DRIVE_MODEL,
  dvrId,
  driveModel,
});

export const updateDriveAmount = (dvrId, driveAmount) => ({
  type: UPDATE_RODEO_DRIVE_AMOUNT,
  dvrId,
  driveAmount,
});

// Action types
export {
  INITIALIZE_RODEO_STATE,
  UPDATE_RODEO_MODEL,
  UPDATE_RODEO_CONFIGURATION,
  PUSH_RODEO_DATA_RATE,
  DELETE_RODEO_DATA_RATE,
  REVERT_RODEO_CAMERA_STATE,
  COPY_RODEO_CAMERA_STATE,
  PASTE_RODEO_CAMERA_STATE,
  DUPLICATE_RODEO_CAMERA_STATE,
  TOGGLE_RODEO_CAMERA_TYPE,
  UPDATE_RODEO_RAID,
  UPDATE_RODEO_DRIVE_MODEL,
  UPDATE_RODEO_DRIVE_AMOUNT,
  rodeoActionTypes,
};
