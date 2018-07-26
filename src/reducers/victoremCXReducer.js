import {
  SENSOR,
  FORMAT,
  FORMATS,
  CAMERA_OPTION,
  RESOLUTION,
} from '../components/VictoremCXCalculator/constants';
import * as resolution from '../components/VictoremCXCalculator/utils/resolution';
import calculateFrameRate from '../components/VictoremCXCalculator/utils/calculateFrameRate';
import calculateDataRate from '../components/VictoremCXCalculator/utils/calculateDataRate';
import * as support from '../components/VictoremCXCalculator/utils/support';
import {
  UPDATE_VICTOREM_CX_MODEL,
  UPDATE_VICTOREM_CX_FORMAT,
  UPDATE_VICTOREM_CX_BIT_DEPTH,
  UPDATE_VICTOREM_CX_RESOLUTION_PRESET,
  UPDATE_VICTOREM_CX_WIDTH,
  UPDATE_VICTOREM_CX_HEIGHT,
  UPDATE_VICTOREM_CX_CAMERA_OPTION,
} from '../actions/victoremCXActions';

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
    cameraOption,
  } = calculatorState;
  let resolutionTooltip = '';
  if (cameraOption === CAMERA_OPTION.SUBSAMPLING) {
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
  const minHeight = resolution.calculateMinHeight(model);
  const maxHeight = resolution.calculateMaxHeight(calculatorState);
  const heightStep = resolution.calculateHeightStep(model);
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
const updateOutput = (calculatorState) => {
  const frameRate = calculateFrameRate(calculatorState);
  const dataRate = calculateDataRate({
    ...calculatorState, frameRate,
  });
  return {
    ...calculatorState,
    frameRate,
    dataRate,
  };
};

const victoremCXReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case UPDATE_VICTOREM_CX_MODEL: {
      const { model } = action;

      // Get formats
      let formats;
      if (model.startsWith('4B')) {
        formats = FORMATS.CX4B;
      } else if (model.startsWith('16B')) {
        formats = FORMATS.CX16B;
      } else {
        formats = FORMATS.CXX;
      }

      // Get supported options
      const supports2x2Binning = support.supports2x2Binning(model);
      const supportsSubSampling = support.supportsSubSampling(model);
      const supportsVerticalBinning = support.supportsVerticalBinning(model);

      // Update state
      calculatorState = {
        ...calculatorState,
        model,
        sensor: SENSOR[model],
        format: FORMAT.CXP2x1,
        formats,
        supports2x2Binning,
        supportsSubSampling,
        supportsVerticalBinning,
        cameraOption: CAMERA_OPTION.NONE,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VICTOREM_CX_FORMAT: {
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

    case UPDATE_VICTOREM_CX_BIT_DEPTH: {
      const { bitDepth } = action;
      calculatorState = {
        ...calculatorState,
        bitDepth,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VICTOREM_CX_RESOLUTION_PRESET: {
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
          const [width, height] = resolutionPreset.split('x');
          calculatorState = {
            ...calculatorState,
            width: Number(width),
            height: Number(height),
          };
        }
      }

      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_VICTOREM_CX_WIDTH: {
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

    case UPDATE_VICTOREM_CX_HEIGHT: {
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

    case UPDATE_VICTOREM_CX_CAMERA_OPTION: {
      const { cameraOption } = action;
      calculatorState = {
        ...calculatorState,
        cameraOption,
        resolutionPreset: RESOLUTION.MAXIMUM,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[cameraId] = calculatorState;
  return calculators;
};

export default victoremCXReducer;
