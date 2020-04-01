import {
  MODELS,
  SENSOR,
  FORMAT,
  RESOLUTION,
  RESOLUTION_VALUES,
  RESOLUTION_PRESETS,
  DRIVE_CAPACITY,
} from '../components/VolucamCalculator/constants';
import * as resolution from '../components/VolucamCalculator/utils/resolution';
import calculateMaxFrameRate from '../components/VolucamCalculator/utils/calculateFrameRate';
import calculateDataRate from '../components/VolucamCalculator/utils/calculateDataRate';
import supportedBitDepths from '../components/VolucamCalculator/utils/support';
import {
  INITIALIZE_VOLUCAM_DVR_STATE,
  UPDATE_VOLUCAM_MODEL,
  UPDATE_VOLUCAM_ADC_BIT_DEPTH,
  UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH,
  UPDATE_VOLUCAM_RESOLUTION_PRESET,
  UPDATE_VOLUCAM_WIDTH,
  UPDATE_VOLUCAM_HEIGHT,
  UPDATE_VOLUCAM_SENSOR_DRIVE_MODE,
  UPDATE_VOLUCAM_DRIVE_MODEL,
  UPDATE_VOLUCAM_FRAME_RATE,
  RESET_VOLUCAM_FRAME_RATE,
} from '../actions/volucamActions';

// Update and validate resolution
const updateResolution = (inputCalculatorState) => {
  let calculatorState = { ...inputCalculatorState };
  const {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    widthStep,
    heightStep,
    resolutionPreset,
  } = calculatorState;

  // If min/max preset, update values
  switch (resolutionPreset) {
    case RESOLUTION.MINIMUM:
      calculatorState = {
        ...calculatorState,
        width: minWidth,
        height: minHeight,
      };
      break;

    case RESOLUTION.MAXIMUM:
      calculatorState = {
        ...calculatorState,
        width: maxWidth,
        height: maxHeight,
      };
      break;

    default:
      break;
  }

  // Validate input
  const {
    width,
    height,
    cameraMode,
  } = calculatorState;
  let resolutionTooltip = '';
  if (cameraMode !== 1) {
    if (width > maxWidth) {
      resolutionTooltip = `Maximum width is ${maxWidth}px.`;
    }

    if (height > maxHeight) {
      resolutionTooltip = `Maximum height is ${maxHeight}px.`;
    }

    if ((width % widthStep) !== 0) {
      resolutionTooltip = `Width must be a multiple of ${widthStep}.`;
    }

    if ((height % heightStep) !== 0) {
      resolutionTooltip = `Height must be a multiple of ${heightStep}.`;
    }
  }

  const error = resolutionTooltip !== '';
  return {
    ...calculatorState,
    width,
    height,
    resolutionTooltip,
    error,
  };
};

// Update resolution values
const updateResolutionConstraints = (calculatorState) => {
  const { model } = calculatorState;
  const minWidth = resolution.calculateMinWidth(model);
  const maxWidth = resolution.calculateMaxWidth(calculatorState);
  const widthStep = resolution.calculateWidthStep(model);
  const minHeight = resolution.calculateMinHeight();
  const maxHeight = resolution.calculateMaxHeight(calculatorState);
  const heightStep = resolution.calculateHeightStep();
  return {
    ...calculatorState,
    minWidth,
    maxWidth,
    widthStep,
    minHeight,
    maxHeight,
    heightStep,
  };
};

// Convert seconds to formatted time.
const secondsTohhmmss = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.floor(seconds);
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  const result = `${hours}h ${minutes}m ${seconds}s`;
  return result;
};

// Update output
const updateOutput = (calculatorState, dontResetFrameRate) => {
  const maxFrameRate = calculateMaxFrameRate(calculatorState);
  let { frameRate } = calculatorState;
  if (!dontResetFrameRate) {
    frameRate = maxFrameRate.toFixed(1);
  }

  const {
    dataRate,
    secondsRemaining,
  } = calculateDataRate({
    ...calculatorState,
    frameRate,
  });

  const recordingTime = Number.isFinite(secondsRemaining) ? secondsTohhmmss(secondsRemaining) : 'N/A';
  return {
    ...calculatorState,
    frameRate,
    maxFrameRate,
    dataRate,
    recordingTime,
  };
};

const countDecimalPlaces = (number) => {
  const str = `${number}`;
  const index = str.indexOf('.');
  if (index >= 0) {
    return str.length - index - 1;
  }

  return 0;
};

const volucamReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_VOLUCAM_DVR_STATE: {
      const { initialized } = calculatorState;
      if (initialized) {
        return state;
      }

      const { models } = calculatorState;
      const model = models[0];
      calculatorState = {
        ...calculatorState,
        model,
        models,
        initialized: true,
      };

      // Fall-through
    }

    case UPDATE_VOLUCAM_MODEL: {
      const { model } = action.model ? action : calculatorState;

      // Get sensor
      const sensor = SENSOR[model];

      // Get format
      let format;
      if (MODELS.TYPE_174.includes(model)) {
        format = FORMAT.CXP3x2;
      } else if (MODELS.TYPE_265.includes(model)) {
        format = FORMAT.CXP3x1;
      } else {
        format = FORMAT.CXP6x2;
      }

      // Get camera mode
      let cameraMode;
      if (model.startsWith('205')) {
        cameraMode = 1;
      } else {
        cameraMode = 0;
      }

      // Get supported options
      const adcBitDepths = supportedBitDepths({
        ...calculatorState,
        model,
      });
      const adcBitDepth = adcBitDepths[0];
      const outputBitDepth = 8;

      // Change resolution back to Maximum preset
      const resolutionPresets = RESOLUTION_PRESETS[model];
      const resolutionPreset = resolutionPresets[0];

      // Update state
      calculatorState = {
        ...calculatorState,
        model,
        sensor,
        format,
        adcBitDepth,
        adcBitDepths,
        outputBitDepth,
        cameraMode,
        resolutionPreset,
        resolutionPresets,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_ADC_BIT_DEPTH: {
      const { adcBitDepth } = action;
      let { outputBitDepth } = calculatorState;
      const prevAdcBitDepth = calculatorState.adcBitDepth;
      if (adcBitDepth < prevAdcBitDepth && outputBitDepth > adcBitDepth) {
        outputBitDepth = adcBitDepth;
      }
      calculatorState = {
        ...calculatorState,
        adcBitDepth,
        outputBitDepth,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_OUTPUT_BIT_DEPTH: {
      const { outputBitDepth } = action;
      calculatorState = {
        ...calculatorState,
        outputBitDepth,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_RESOLUTION_PRESET: {
      const { resolutionPreset } = action;
      calculatorState = {
        ...calculatorState,
        resolutionPreset,
      };
      switch (resolutionPreset) {
        case RESOLUTION.CUSTOM:
        case RESOLUTION.MINIMUM:
        case RESOLUTION.MAXIMUM:
          break;

        default: {
          const [width, height] = RESOLUTION_VALUES[resolutionPreset];
          calculatorState = {
            ...calculatorState,
            width,
            height,
          };
        }
      }

      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_WIDTH: {
      const { width } = action;
      calculatorState = {
        ...calculatorState,
        width,
        resolutionPreset: RESOLUTION.CUSTOM,
      };
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_HEIGHT: {
      const { height } = action;
      calculatorState = {
        ...calculatorState,
        height,
        resolutionPreset: RESOLUTION.CUSTOM,
      };
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_SENSOR_DRIVE_MODE: {
      const { sensorDriveMode } = action;
      calculatorState = {
        ...calculatorState,
        sensorDriveMode,
        resolutionPreset: RESOLUTION.MAXIMUM,
      };
      const adcBitDepths = supportedBitDepths(calculatorState);
      const adcBitDepth = adcBitDepths[0];
      calculatorState = {
        ...calculatorState,
        adcBitDepth,
        adcBitDepths,
        resolutionPreset: RESOLUTION.MAXIMUM,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VOLUCAM_DRIVE_MODEL: {
      const { driveModel } = action;
      const capacity = DRIVE_CAPACITY[driveModel];
      calculatorState = {
        ...calculatorState,
        driveModel,
        capacity,
      };
      calculatorState = updateOutput(calculatorState, true);
      break;
    }

    case UPDATE_VOLUCAM_FRAME_RATE: {
      let { frameRate } = action;
      const { maxFrameRate } = calculatorState;
      const decimalPlaces = countDecimalPlaces(frameRate);
      const invalidFrameRate = decimalPlaces > 1 || Number(frameRate.toFixed(1)) > Number(maxFrameRate.toFixed(1));
      if (invalidFrameRate) {
        return state;
      } if (frameRate === 0) {
        frameRate = 1;
      }

      calculatorState = {
        ...calculatorState,
        frameRate,
      };
      calculatorState = updateOutput(calculatorState, true);
      break;
    }

    case RESET_VOLUCAM_FRAME_RATE: {
      calculatorState = updateOutput(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[cameraId] = calculatorState;
  return calculators;
};

export default volucamReducer;
