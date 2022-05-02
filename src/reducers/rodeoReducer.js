import uuid from 'uuid';

import {
  MODEL,
  CX_CONFIGS,
  DRIVE_CAPACITY, LINK, MODE, MODES,
} from '../components/RodeoCalculator/constants';

import {
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
} from '../actions/rodeoActions';

import { flareCXDefaultState } from '../components/FlareCXCalculator/constants';
import { redwoodDefaultState } from '../components/RedwoodCalculator/constants';
import { victoremCXDefaultState } from '../components/VictoremCXCalculator/constants';
import { customCXDefaultState } from '../components/CustomCXCalculator/constants';

const setCameraAdded = (cameraId, calculatorState, added) => {
  let { cameras } = calculatorState;
  let cameraState = cameras[cameraId];
  cameraState = {
    ...cameraState,
    added,
  };
  cameras = {
    ...cameras,
    [cameraId]: cameraState,
  };
  return {
    ...calculatorState,
    cameras,
  };
};

const generateCameraState = (dvrId, cameraId, cameraType, mode) => {
  let cameraState;
  switch (cameraType) {
    case 'flare-cx':
      cameraState = flareCXDefaultState;
      break;

    case 'redwood':
      cameraState = redwoodDefaultState;
      break;

    case 'victorem-cx':
      cameraState = victoremCXDefaultState;
      break;

    case 'custom-cx':
      cameraState = customCXDefaultState;
      break;

    default:
      break;
  }

  return {
    ...cameraState,
    dvrId,
    cameraId,
    mode,
  };
};

const reloadCameras = (calculatorState, dvrId) => {
  const {
    link,
    configuration,
  } = calculatorState;

  // Get default camera type
  let cameraType;
  switch (link) {
    case LINK.CX:
      cameraType = 'flare-cx';
      break;

    default:
      break;
  }

  // Reset cameras / insert mode
  let cameras = { order: [] };
  const modes = MODES[configuration];
  modes.forEach((mode) => {
    const cameraId = uuid();
    const cameraState = generateCameraState(dvrId, cameraId, cameraType, mode);
    cameras = {
      ...cameras,
      [cameraId]: cameraState,
      order: cameras.order.concat(cameraId),
    };
  });
  return {
    ...calculatorState,
    cameras,
    dataRates: [],
    totalDataRate: 0,
  };
};

const loadCameras = (calculatorState, dvrId) => {
  const { cameras } = calculatorState;
  if (!cameras) {
    return reloadCameras(calculatorState, dvrId);
  }

  return calculatorState;
};

const updateTotalDataRate = (calculatorState) => {
  const {
    model,
    dataRates,
  } = calculatorState;
  let totalDataRate = 0;
  dataRates.forEach((dataRate) => {
    totalDataRate += Number(dataRate.value);
  });
  totalDataRate = totalDataRate.toFixed(2);
  totalDataRate /= 2; // approximately half from compression
  let dataRateTooltip = '';
  switch (model) {
    case MODEL.RODEOCX:
      break;

    default:
      if (totalDataRate > 1620) {
        dataRateTooltip = `For accumulated data rates approaching 1620 MB/s, please
        contact IO Industries or complete the calculations in the DVR user's manuals to 
        confirm the DVR will support recording your camera sources with no dropped frames.`;
      }
  }

  return {
    ...calculatorState,
    dataRateTooltip,
    totalDataRate,
  };
};

const secondsTohhmmss = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds);
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  const result = `${hours}h ${minutes}m ${seconds}s`;
  return result;
};

const updateRecordingTime = (calculatorState) => {
  const {
    raid,
    totalDataRate,
  } = calculatorState;
  let { totalCapacity } = calculatorState;
  switch (raid) {
    case 1:
      totalCapacity /= 2;
      break;

    case 5:
      totalCapacity /= 3;
      break;

    default:
      break;
  }

  const seconds = totalCapacity / totalDataRate * 1024;
  const recordingTime = Number.isFinite(seconds) ? secondsTohhmmss(seconds) : 'N/A';
  return {
    ...calculatorState,
    recordingTime,
  };
};

const updateDriveAmount = (calculatorState) => {
  const { model } = calculatorState;
  let {
    driveAmount,
    driveAmounts,
  } = calculatorState;
  switch (model) {
    case MODEL.RODEOCX:
      driveAmount = 6;
      driveAmounts = [1, 2, 3, 4, 5, 6];
      break;

    default:
      driveAmount = 4;
      driveAmounts = [1, 2, 3, 4];
      break;
  }

  const { driveCapacity } = calculatorState;
  const totalCapacity = driveAmount * driveCapacity;
  return {
    ...calculatorState,
    driveAmount,
    driveAmounts,
    totalCapacity,
  };
};

const rodeoReducer = (state = { order: [] }, action) => {
  const {
    dvrId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[dvrId];

  switch (type) {
    case INITIALIZE_RODEO_STATE:
      calculatorState = loadCameras(calculatorState, dvrId);
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;

    case UPDATE_RODEO_MODEL: {
      const { model } = action;

      // Get link and configuration
      let link;
      let configurations;
      let mode;
      switch (model) {
        case MODEL.RODEOCX:
          link = LINK.CX;
          configurations = CX_CONFIGS;
          mode = MODE.SINGLE;
          break;

        default:
          break;
      }

      const configuration = configurations[0];
      calculatorState = {
        ...calculatorState,
        model,
        link,
        configuration,
        configurations,
        mode,
      };
      calculatorState = reloadCameras(calculatorState, dvrId);
      calculatorState = updateDriveAmount(calculatorState);
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_RODEO_CONFIGURATION: {
      const { configuration } = action;
      calculatorState = {
        ...calculatorState,
        configuration,
      };
      calculatorState = reloadCameras(calculatorState, dvrId);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case PUSH_RODEO_DATA_RATE: {
      const {
        cameraId,
        dataRate,
      } = action;

      // Filter out existing data rate
      let { dataRates } = calculatorState;
      dataRates = dataRates.filter(existingDataRate => existingDataRate.cameraId !== cameraId);

      // Push new data rate
      dataRates.push({
        cameraId,
        value: dataRate,
      });

      // Update data-rates
      calculatorState = {
        ...calculatorState,
        dataRates,
      };
      calculatorState = setCameraAdded(cameraId, calculatorState, true);
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case DELETE_RODEO_DATA_RATE: {
      const { cameraId } = action;

      // Filter out stored data-rate
      let { dataRates } = calculatorState;
      dataRates = dataRates.filter(dataRate => dataRate.cameraId !== cameraId);

      // Update data-rates
      calculatorState = {
        ...calculatorState,
        dataRates,
      };
      calculatorState = setCameraAdded(cameraId, calculatorState, false);
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case REVERT_RODEO_CAMERA_STATE: {
      const {
        cameraId,
        cameraState,
      } = action;

      // Filter out camera
      let { cameras } = calculatorState;
      cameras = { ...cameras };
      cameras[cameraId] = cameraState;

      // Update cameras
      calculatorState = {
        ...calculatorState,
        cameras,
      };
      break;
    }

    case COPY_RODEO_CAMERA_STATE: {
      const { cameraId } = action;
      const { cameras } = calculatorState;
      const copiedCameraState = cameras[cameraId];

      // Update cameras
      calculatorState = {
        ...calculatorState,
        copiedCameraState,
      };
      break;
    }

    case PASTE_RODEO_CAMERA_STATE: {
      const { cameraId } = action;

      // Copy saved camera state to new camera, excluding camera ID
      let {
        copiedCameraState,
        dataRates,
      } = calculatorState;

      copiedCameraState = {
        ...copiedCameraState,
        cameraId,
      };

      dataRates = dataRates.filter(existingDataRate => existingDataRate.cameraId !== cameraId);

      if (copiedCameraState) {
        let { cameras } = calculatorState;
        cameras = { ...cameras };
        cameras[cameraId] = copiedCameraState;

        // Push new data rate
        dataRates.push({
          cameraId,
          value: copiedCameraState.dataRate,
        });

        // Update cameras
        calculatorState = {
          ...calculatorState,
          cameras,
          dataRates,
        };
        calculatorState = updateTotalDataRate(calculatorState);
        calculatorState = updateRecordingTime(calculatorState);
      }
      break;
    }

    case DUPLICATE_RODEO_CAMERA_STATE: {
      const { cameraId } = action;

      let { cameras } = calculatorState;
      cameras = { ...cameras };

      let duplicatedCameraState = cameras[cameraId];
      const dataRates = [];

      cameras.order.map((id) => {
        // Copy existing camera ID to duplicated camera state
        duplicatedCameraState = {
          ...duplicatedCameraState,
          cameraId: id,
          added: true,
        };
        cameras[id] = duplicatedCameraState;

        // Push new data rate
        dataRates.push({
          cameraId: id,
          value: duplicatedCameraState.dataRate,
        });
        return true;
      });

      // Update cameras and data rate
      calculatorState = {
        ...calculatorState,
        cameras,
        dataRates,
      };
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case TOGGLE_RODEO_CAMERA_TYPE: {
      const {
        cameraId,
        cameraType,
      } = action;

      // Generate new camera with properties
      let { cameras } = calculatorState;
      let cameraState = cameras[cameraId];
      const { mode } = cameraState;
      cameraState = generateCameraState(dvrId, cameraId, cameraType, mode);

      // Replace existing camera
      cameras = { ...cameras };
      cameras[cameraId] = cameraState;

      calculatorState = {
        ...calculatorState,
        cameras,
      };
      break;
    }

    case UPDATE_RODEO_RAID: {
      const { raid } = action;
      const { driveAmount } = calculatorState;

      const { driveCapacity } = calculatorState;
      const totalCapacity = driveAmount * driveCapacity;
      calculatorState = {
        ...calculatorState,
        raid,
        driveAmount,
        totalCapacity,
      };
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_RODEO_DRIVE_MODEL: {
      const { driveModel } = action;
      const { driveAmount } = calculatorState;
      const driveCapacity = DRIVE_CAPACITY[driveModel];
      const totalCapacity = driveCapacity * driveAmount;
      calculatorState = {
        ...calculatorState,
        driveModel,
        driveCapacity,
        totalCapacity,
      };
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_RODEO_DRIVE_AMOUNT: {
      const { driveAmount } = action;
      const {
        model,
        driveCapacity,
      } = calculatorState;
      const totalCapacity = driveAmount * driveCapacity;

      let driveTooltip = '';
      switch (model) {
        case MODEL.RODEOCX:
          if (driveAmount !== 6) {
            driveTooltip = 'For Rodeo DVRs, 6 drives are recommended.';
          }

          break;

        default:
          if (driveAmount !== 4) {
            driveTooltip = 'For most DVRs, configurations of 4 drives are recommended.';
            break;
          }
      }

      calculatorState = {
        ...calculatorState,
        driveAmount,
        driveTooltip,
        totalCapacity,
      };
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[dvrId] = calculatorState;
  return calculators;
};

export default rodeoReducer;
