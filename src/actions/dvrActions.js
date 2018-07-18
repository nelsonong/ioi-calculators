const INITIALIZE_DVR_STATE = "INITIALIZE_DVR_STATE";
const UPDATE_DVR_MODEL = 'UPDATE_DVR_MODEL';
const UPDATE_DVR_CONFIGURATION = 'UPDATE_DVR_CONFIGURATION';
const PUSH_DVR_DATA_RATE = 'PUSH_DATA_RATE';
const DELETE_DVR_DATA_RATE = 'DELETE_DATA_RATE';
const REVERT_DVR_CAMERA_STATE = 'REVERT_DVR_CAMERA_STATE';
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
    UPDATE_DVR_RAID,
    UPDATE_DVR_DRIVE_MODEL,
    UPDATE_DVR_DRIVE_AMOUNT
];

// Action generators
export const initializeState = (id) => ({
    type: INITIALIZE_DVR_STATE,
    id
});

export const updateModel = (id, model) => ({
    type: UPDATE_DVR_MODEL,
    id,
    model
});

export const updateConfiguration = (id, configuration) => ({
    type: UPDATE_DVR_CONFIGURATION,
    id,
    configuration
});

export const pushDataRate = (id, cameraId, dataRate) => ({
    type: PUSH_DVR_DATA_RATE,
    id,
    cameraId,
    dataRate
});

export const deleteDataRate = (id, cameraId) => ({
    type: DELETE_DVR_DATA_RATE,
    id,
    cameraId
});

export const revertCameraState = (id, cameraId, cameraState) => ({
    type: REVERT_DVR_CAMERA_STATE,
    id,
    cameraId,
    cameraState
});

export const updateRaid = (id, raid) => ({
    type: UPDATE_DVR_RAID,
    id,
    raid
});

export const updateDriveModel = (id, driveModel) => ({
    type: UPDATE_DVR_DRIVE_MODEL,
    id,
    driveModel
});

export const updateDriveAmount = (id, driveAmount) => ({
    type: UPDATE_DVR_DRIVE_AMOUNT,
    id,
    driveAmount
});

// Action types
export {
    INITIALIZE_DVR_STATE,
    UPDATE_DVR_MODEL,
    UPDATE_DVR_CONFIGURATION,
    PUSH_DVR_DATA_RATE,
    DELETE_DVR_DATA_RATE,
    REVERT_DVR_CAMERA_STATE,
    UPDATE_DVR_RAID,
    UPDATE_DVR_DRIVE_MODEL,
    UPDATE_DVR_DRIVE_AMOUNT,
    dvrActionTypes
};