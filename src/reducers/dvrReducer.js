import uuid from 'uuid';
import {
  MODEL,
  CL_CONFIGS, CLPLUS_CONFIGS, CLMAX_CONFIGS,
  CX_CONFIGS, CXPLUS_CONFIGS, CXMAX_CONFIGS,
  SDI_CONFIGS, SDIMAX_CONFIGS,
  GEV_CONFIGS, NTSC_CONFIGS,
  DRIVE_CAPACITY, LINK, MODE, MODES,
} from '../components/DVRCalculator/constants';

import {
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
} from '../actions/dvrActions';

import { flareCLDefaultState } from '../components/FlareCLCalculator/constants';
import { flareCXDefaultState } from '../components/FlareCXCalculator/constants';
import { flareSDIDefaultState } from '../components/FlareSDICalculator/constants';
import { customCLDefaultState } from '../components/CustomCLCalculator/constants';
import { customCXDefaultState } from '../components/CustomCXCalculator/constants';
import { gevDefaultState } from '../components/GEVCalculator/constants';
import { ntscDefaultState } from '../components/NTSCCalculator/constants';

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

const generateCameraState = (dvrId, cameraId, link, mode, custom = false) => {
  let cameraState;
  switch (link) {
    case LINK.CL:
      cameraState = custom ? customCLDefaultState : flareCLDefaultState;
      break;

    case LINK.CX:
      cameraState = custom ? customCXDefaultState : flareCXDefaultState;
      break;

    case LINK.SDI:
      cameraState = flareSDIDefaultState;
      break;

    case LINK.GEV:
      cameraState = gevDefaultState;
      break;

    case LINK.NTSC:
      cameraState = ntscDefaultState;
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

  // Reset cameras / insert mode
  let cameras = { order: [] };
  const modes = MODES[configuration];
  modes.forEach((mode) => {
    const cameraId = uuid();
    const cameraState = generateCameraState(dvrId, cameraId, link, mode);
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
  const { dataRates } = calculatorState;
  let totalDataRate = 0;
  dataRates.forEach((dataRate) => {
    totalDataRate += Number(dataRate.value);
  });
  totalDataRate = totalDataRate.toFixed(2);
  return {
    ...calculatorState,
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

const dvrReducer = (state = { order: [] }, action) => {
  const {
    dvrId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[dvrId];

  switch (type) {
    case INITIALIZE_DVR_STATE:
      calculatorState = loadCameras(calculatorState, dvrId);
      calculatorState = updateRecordingTime(calculatorState);
      break;

    case UPDATE_DVR_MODEL: {
      const { model } = action;

      // Get link and configuration
      let link;
      let configurations;
      let mode;
      switch (model) {
        case MODEL.CORE2CL:
          link = LINK.CL;
          configurations = CL_CONFIGS;
          mode = MODE.BASE;
          break;

        case MODEL.CORE2CLPLUS:
          link = LINK.CL;
          configurations = CLPLUS_CONFIGS;
          mode = MODE.BASE;
          break;

        case MODEL.CORE2CLMAX:
          link = LINK.CL;
          configurations = CLMAX_CONFIGS;
          mode = MODE.BASE;
          break;

        case MODEL.CORE2CX:
          link = LINK.CX;
          configurations = CX_CONFIGS;
          mode = MODE.SINGLE;
          break;

        case MODEL.CORE2CXPLUS:
          link = LINK.CX;
          configurations = CXPLUS_CONFIGS;
          mode = MODE.SINGLE;
          break;

        case MODEL.CORE2CXMAX:
          link = LINK.CX;
          configurations = CXMAX_CONFIGS;
          mode = MODE.SINGLE;
          break;

        case MODEL.CORE2SDI:
          link = LINK.SDI;
          configurations = SDI_CONFIGS;
          mode = MODE.SINGLE;
          break;

        case MODEL.CORE2SDIMAX:
          link = LINK.SDI;
          configurations = SDIMAX_CONFIGS;
          mode = MODE.SINGLE;
          break;

        case MODEL.COREGEV:
          link = LINK.GEV;
          configurations = GEV_CONFIGS;
          break;

        case MODEL.CORENTSC:
          link = LINK.NTSC;
          configurations = NTSC_CONFIGS;
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
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_DVR_CONFIGURATION: {
      const { configuration } = action;
      calculatorState = {
        ...calculatorState,
        configuration,
      };
      calculatorState = reloadCameras(calculatorState, dvrId);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case PUSH_DVR_DATA_RATE: {
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

    case DELETE_DVR_DATA_RATE: {
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

    case REVERT_DVR_CAMERA_STATE: {
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

    case TOGGLE_DVR_CUSTOM_MODE: {
      const { cameraId } = action;

      // Get existing camera properties
      const { link } = calculatorState;
      let { cameras } = calculatorState;

      // Generate new camera with properties
      let cameraState = cameras[cameraId];
      const {
        mode, cameraType,
      } = cameraState;
      const custom = (cameraType.startsWith('custom'));
      cameraState = generateCameraState(dvrId, cameraId, link, mode, !custom);

      // Replace existing camera
      cameras = { ...cameras };
      cameras[cameraId] = cameraState;

      calculatorState = {
        ...calculatorState,
        cameras,
      };
      break;
    }

    case UPDATE_DVR_RAID: {
      const { raid } = action;
      let {
        driveAmount,
        driveAmounts,
      } = calculatorState;
      switch (raid) {
        case 0:
          driveAmount = 2;
          driveAmounts = [2, 3, 4, 5, 6];
          break;

        case 1:
          driveAmount = 2;
          driveAmounts = [2, 3, 4, 5, 6];
          break;

        case 5:
          driveAmount = 3;
          driveAmounts = [3, 4, 5, 6];
          break;

        default:
          break;
      }

      const { driveCapacity } = calculatorState;
      const totalCapacity = driveAmount * driveCapacity;
      calculatorState = {
        ...calculatorState,
        raid,
        driveAmount,
        driveAmounts,
        totalCapacity,
      };
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_DVR_DRIVE_MODEL: {
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
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_DVR_DRIVE_AMOUNT: {
      const { driveAmount } = action;
      const { driveCapacity } = calculatorState;
      const totalCapacity = driveAmount * driveCapacity;
      calculatorState = {
        ...calculatorState,
        driveAmount,
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

export default dvrReducer;
