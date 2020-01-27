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
  TOGGLE_DVR_CAMERA_TYPE,
  UPDATE_DVR_RAID,
  UPDATE_DVR_DRIVE_MODEL,
  UPDATE_DVR_DRIVE_AMOUNT,
} from '../actions/dvrActions';

import { flareCLDefaultState } from '../components/FlareCLCalculator/constants';
import { flareCXDefaultState } from '../components/FlareCXCalculator/constants';
import { flareSDIDefaultState } from '../components/FlareSDICalculator/constants';
import { victoremCXDefaultState } from '../components/VictoremCXCalculator/constants';
import { victoremSDIDefaultState } from '../components/VictoremSDICalculator/constants';
import { customCLDefaultState } from '../components/CustomCLCalculator/constants';
import { customCXDefaultState } from '../components/CustomCXCalculator/constants';
import { customSDIDefaultState } from '../components/CustomSDICalculator/constants';
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

const generateCameraState = (dvrId, cameraId, cameraType, mode) => {
  let cameraState;
  switch (cameraType) {
    case 'flare-cl':
      cameraState = flareCLDefaultState;
      break;

    case 'flare-cx':
      cameraState = flareCXDefaultState;
      break;

    case 'flare-sdi':
      cameraState = flareSDIDefaultState;
      break;

    case 'victorem-cx':
      cameraState = victoremCXDefaultState;
      break;

    case 'victorem-sdi':
      cameraState = victoremSDIDefaultState;
      break;

    case 'custom-cl':
      cameraState = customCLDefaultState;
      break;

    case 'custom-cx':
      cameraState = customCXDefaultState;
      break;

    case 'custom-sdi':
      cameraState = customSDIDefaultState;
      break;

    case 'gev':
      cameraState = gevDefaultState;
      break;

    case 'ntsc':
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

  // Get default camera type
  let cameraType;
  switch (link) {
    case LINK.CL:
      cameraType = 'flare-cl';
      break;

    case LINK.CX:
      cameraType = 'flare-cx';
      break;

    case LINK.SDI:
      cameraType = 'flare-sdi';
      break;

    case LINK.GEV:
      cameraType = 'gev';
      break;

    case LINK.NTSC:
      cameraType = 'ntsc';
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
  let dataRateTooltip = '';
  switch (model) {
    case MODEL.CORE2CLMAX:
    case MODEL.CORE2CXMAX:
    case MODEL.CORE2SDIMAX:
    case MODEL.COREGEV:
    case MODEL.CORENTSC:
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
    case MODEL.CORE2CLMAX:
    case MODEL.CORE2CXMAX:
    case MODEL.CORE2SDIMAX:
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
      calculatorState = updateTotalDataRate(calculatorState);
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
      calculatorState = updateDriveAmount(calculatorState);
      calculatorState = updateTotalDataRate(calculatorState);
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

    case TOGGLE_DVR_CAMERA_TYPE: {
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

    case UPDATE_DVR_RAID: {
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
      calculatorState = updateTotalDataRate(calculatorState);
      calculatorState = updateRecordingTime(calculatorState);
      break;
    }

    case UPDATE_DVR_DRIVE_AMOUNT: {
      const { driveAmount } = action;
      const {
        model,
        driveCapacity,
      } = calculatorState;
      const totalCapacity = driveAmount * driveCapacity;

      let driveTooltip = '';
      switch (model) {
        case MODEL.CORE2CLMAX:
        case MODEL.CORE2CXMAX:
        case MODEL.CORE2SDIMAX:
          if (driveAmount !== 6) {
            driveTooltip = 'For Core 2 MAX DVRs, 6 drives are recommended.';
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

export default dvrReducer;
