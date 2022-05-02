const INITIALIZE_CORE2_STATE = 'INITIALIZE_CORE2_STATE';
const UPDATE_CORE2_MODEL = 'UPDATE_CORE2_MODEL';
const UPDATE_CORE2_CONFIGURATION = 'UPDATE_CORE2_CONFIGURATION';
const PUSH_CORE2_DATA_RATE = 'PUSH_CORE2_DATA_RATE';
const DELETE_CORE2_DATA_RATE = 'DELETE_CORE2_DATA_RATE';
const REVERT_CORE2_CAMERA_STATE = 'REVERT_CORE2_CAMERA_STATE';
const COPY_CORE2_CAMERA_STATE = 'COPY_CORE2_CAMERA_STATE';
const PASTE_CORE2_CAMERA_STATE = 'PASTE_CORE2_CAMERA_STATE';
const DUPLICATE_CORE2_CAMERA_STATE = 'DUPLICATE_CORE2_CAMERA_STATE';
const TOGGLE_CORE2_CAMERA_TYPE = 'TOGGLE_CORE2_CAMERA_TYPE';
const UPDATE_CORE2_RAID = 'UPDATE_CORE2_RAID';
const UPDATE_CORE2_DRIVE_MODEL = 'UPDATE_CORE2_DRIVE_MODEL';
const UPDATE_CORE2_DRIVE_AMOUNT = 'UPDATE_CORE2_DRIVE_AMOUNT';

const core2ActionTypes = [
  INITIALIZE_CORE2_STATE,
  UPDATE_CORE2_MODEL,
  UPDATE_CORE2_CONFIGURATION,
  PUSH_CORE2_DATA_RATE,
  DELETE_CORE2_DATA_RATE,
  REVERT_CORE2_CAMERA_STATE,
  COPY_CORE2_CAMERA_STATE,
  PASTE_CORE2_CAMERA_STATE,
  DUPLICATE_CORE2_CAMERA_STATE,
  TOGGLE_CORE2_CAMERA_TYPE,
  UPDATE_CORE2_RAID,
  UPDATE_CORE2_DRIVE_MODEL,
  UPDATE_CORE2_DRIVE_AMOUNT,
];

// Action generators
export const initializeState = dvrId => ({
  type: INITIALIZE_CORE2_STATE,
  dvrId,
});

export const updateModel = (dvrId, model) => ({
  type: UPDATE_CORE2_MODEL,
  dvrId,
  model,
});

export const updateConfiguration = (dvrId, configuration) => ({
  type: UPDATE_CORE2_CONFIGURATION,
  dvrId,
  configuration,
});

export const pushDataRate = (dvrId, cameraId, dataRate) => ({
  type: PUSH_CORE2_DATA_RATE,
  dvrId,
  cameraId,
  dataRate,
});

export const deleteDataRate = (dvrId, cameraId) => ({
  type: DELETE_CORE2_DATA_RATE,
  dvrId,
  cameraId,
});

export const revertCameraState = (dvrId, cameraId, cameraState) => ({
  type: REVERT_CORE2_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const copyCameraState = (dvrId, cameraId, cameraState) => ({
  type: COPY_CORE2_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const pasteCameraState = (dvrId, cameraId, cameraState) => ({
  type: PASTE_CORE2_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const duplicateCameraState = (dvrId, cameraId, cameraState) => ({
  type: DUPLICATE_CORE2_CAMERA_STATE,
  dvrId,
  cameraId,
  cameraState,
});

export const toggleCamera = (dvrId, cameraId, cameraType) => ({
  type: TOGGLE_CORE2_CAMERA_TYPE,
  dvrId,
  cameraId,
  cameraType,
});

export const updateRaid = (dvrId, raid) => ({
  type: UPDATE_CORE2_RAID,
  dvrId,
  raid,
});

export const updateDriveModel = (dvrId, driveModel) => ({
  type: UPDATE_CORE2_DRIVE_MODEL,
  dvrId,
  driveModel,
});

export const updateDriveAmount = (dvrId, driveAmount) => ({
  type: UPDATE_CORE2_DRIVE_AMOUNT,
  dvrId,
  driveAmount,
});

// Action types
export {
  INITIALIZE_CORE2_STATE,
  UPDATE_CORE2_MODEL,
  UPDATE_CORE2_CONFIGURATION,
  PUSH_CORE2_DATA_RATE,
  DELETE_CORE2_DATA_RATE,
  REVERT_CORE2_CAMERA_STATE,
  COPY_CORE2_CAMERA_STATE,
  PASTE_CORE2_CAMERA_STATE,
  DUPLICATE_CORE2_CAMERA_STATE,
  TOGGLE_CORE2_CAMERA_TYPE,
  UPDATE_CORE2_RAID,
  UPDATE_CORE2_DRIVE_MODEL,
  UPDATE_CORE2_DRIVE_AMOUNT,
  core2ActionTypes,
};
