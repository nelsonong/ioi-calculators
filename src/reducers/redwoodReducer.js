import {
  MODELS,
  SENSORS,
  FORMAT,
  FORMATS,
  RESOLUTION,
  RESOLUTION_VALUES,
  RESOLUTION_PRESETS,
  SUBSAMPLING_BINNING,
  MODE,
} from '../components/RedwoodCalculator/constants';
import * as resolution from '../components/RedwoodCalculator/utils/resolution';
import calculateMaxFrameRate from '../components/RedwoodCalculator/utils/calculateFrameRate';
import calculateDataRate from '../components/RedwoodCalculator/utils/calculateDataRate';
import supportedBitDepths from '../components/RedwoodCalculator/utils/support';
import {
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
  UPDATE_REDWOOD_FRAME_RATE,
  RESET_REDWOOD_FRAME_RATE,
} from '../actions/redwoodActions';

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
    subSamplingBinning,
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

  const subSampling = subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING;
  const bin2 = subSamplingBinning === SUBSAMPLING_BINNING.BIN_2X2;
  const binh = subSamplingBinning === SUBSAMPLING_BINNING.BIN_HORIZONTAL;
  const binv = subSamplingBinning === SUBSAMPLING_BINNING.BIN_VERTICAL;

  const widthOutput = (bin2 || binh || subSampling) ? width / 2 : width;
  const heightOutput = (bin2 || binv) ? height / 2 : height;

  const error = resolutionTooltip !== '';
  return {
    ...calculatorState,
    width,
    widthOutput,
    height,
    heightOutput,
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

// Update output
const updateOutput = (calculatorState, dontResetFrameRate) => {
  const maxFrameRate = calculateMaxFrameRate(calculatorState);
  let { frameRate } = calculatorState;
  if (!dontResetFrameRate) {
    frameRate = Number(maxFrameRate.toFixed(2));
  }

  const { dataRate } = calculateDataRate({
    ...calculatorState,
    frameRate,
  });

  return {
    ...calculatorState,
    frameRate,
    maxFrameRate,
    dataRate,
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

const redwoodReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_REDWOOD_DVR_STATE: {
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

    case UPDATE_REDWOOD_MODEL: {
      const { model } = action.model ? action : calculatorState;

      // Get sensor
      const sensor = SENSORS[model];

      // Get format
      let formats = FORMATS.CXX;
      const { mode } = calculatorState;
      if (mode) {
        switch (mode) {
          case MODE.SINGLE:
            formats = formats.filter(format => format.startsWith('1'));
            break;

          case MODE.DUAL:
            formats = formats.filter(format => format.startsWith('2'));
            break;

          case MODE.QUAD:
            formats = formats.filter(format => format.startsWith('4'));
            break;

          default:
            break;
        }
      }

      const format = formats[0];

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
        formats,
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

    case UPDATE_REDWOOD_FORMAT: {
      const { format } = action;
      calculatorState = {
        ...calculatorState,
        format,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_REDWOOD_ADC_BIT_DEPTH: {
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

    case UPDATE_REDWOOD_OUTPUT_BIT_DEPTH: {
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

    case UPDATE_REDWOOD_DUAL_GAIN: {
      const { dualGain } = action;
      let { subSamplingBinning } = action;
      if (dualGain) subSamplingBinning = SUBSAMPLING_BINNING.NONE;
      calculatorState = {
        ...calculatorState,
        dualGain,
        subSamplingBinning,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_REDWOOD_RESOLUTION_PRESET: {
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

    case UPDATE_REDWOOD_WIDTH: {
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

    case UPDATE_REDWOOD_HEIGHT: {
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

    case UPDATE_REDWOOD_SUBSAMPLING_BINNING: {
      const { subSamplingBinning } = action;

      let { resolutionPreset } = calculatorState;
      if (subSamplingBinning === SUBSAMPLING_BINNING.SUBSAMPLING) {
        resolutionPreset = RESOLUTION.MAXIMUM;
      }

      calculatorState = {
        ...calculatorState,
        resolutionPreset,
        subSamplingBinning,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_REDWOOD_SENSOR_DRIVE_MODE: {
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

    case UPDATE_REDWOOD_FRAME_RATE: {
      let { frameRate } = action;
      const { maxFrameRate } = calculatorState;
      const decimalPlaces = countDecimalPlaces(frameRate);
      const invalidFrameRate = decimalPlaces > 2 || Number(frameRate.toFixed(2)) > Number(maxFrameRate.toFixed(2));
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

    case RESET_REDWOOD_FRAME_RATE: {
      calculatorState = updateOutput(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[cameraId] = calculatorState;
  return calculators;
};

export default redwoodReducer;
