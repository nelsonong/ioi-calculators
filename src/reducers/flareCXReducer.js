import {
  FORMATS,
  RESOLUTION,
  MODE,
} from '../components/FlareCXCalculator/constants';
import * as resolution from '../components/FlareCXCalculator/utils/resolution';
import calculateFrameRate from '../components/FlareCXCalculator/utils/calculateFrameRate';
import calculateDataRate from '../components/FlareCXCalculator/utils/calculateDataRate';
import {
  INITIALIZE_FLARE_CX_DVR_STATE,
  UPDATE_FLARE_CX_MODEL,
  UPDATE_FLARE_CX_BIT_DEPTH,
  UPDATE_FLARE_CX_LINK_COUNT,
  UPDATE_FLARE_CX_LINK_SPEED,
  UPDATE_FLARE_CX_RESOLUTION_PRESET,
  UPDATE_FLARE_CX_WIDTH,
  UPDATE_FLARE_CX_HEIGHT,
  UPDATE_FLARE_CX_SUB_SAMPLING,
} from '../actions/flareCXActions';

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
  } = calculatorState;
  let resolutionTooltip = '';
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

  // Calculate updated resolution values
  const minWidth = resolution.calculateMinWidth(model);
  const maxWidth = resolution.calculateMaxWidth(model);
  const widthStep = resolution.calculateWidthStep(model);
  const minHeight = resolution.calculateMinHeight(model);
  const maxHeight = resolution.calculateMaxHeight(model);
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

const flareCXReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_FLARE_CX_DVR_STATE: {
      const { mode } = action;
      let { models } = calculatorState;
      if (mode === MODE.QUAD) {
        models = models.filter(model => model.startsWith('12M') || model.startsWith('48M'));
      }

      const model = models[0];
      calculatorState = {
        ...calculatorState,
        model,
        models,
      };

      // Fall-through
    }

    case UPDATE_FLARE_CX_MODEL: {
      const { model } = action.model ? action : calculatorState;

      // Get formats
      let formats;
      if (model.startsWith('48M')) {
        formats = FORMATS.CX48m;
      } else if (model.startsWith('12M')) {
        formats = FORMATS.CX12m;
      } else {
        formats = FORMATS.CX2_4m;
      }
      const bitDepth = formats.BitDepths[0];
      const linkCount = formats.LinkCounts[0];
      const linkSpeed = formats.LinkSpeeds[0];
      calculatorState = {
        ...calculatorState,
        model,
        formats,
        bitDepth,
        linkCount,
        linkSpeed,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateResolution(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_FLARE_CX_BIT_DEPTH: {
      const { bitDepth } = action;
      calculatorState = {
        ...calculatorState,
        bitDepth,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_FLARE_CX_LINK_COUNT: {
      const { linkCount } = action;
      calculatorState = {
        ...calculatorState,
        linkCount,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_FLARE_CX_LINK_SPEED: {
      const { linkSpeed } = action;
      calculatorState = {
        ...calculatorState,
        linkSpeed,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_FLARE_CX_RESOLUTION_PRESET: {
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

    case UPDATE_FLARE_CX_WIDTH: {
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

    case UPDATE_FLARE_CX_HEIGHT: {
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

    case UPDATE_FLARE_CX_SUB_SAMPLING: {
      const { subSampling } = action;
      calculatorState = {
        ...calculatorState,
        subSampling,
      };
      calculatorState = updateResolutionConstraints(calculatorState);
      calculatorState = updateOutput(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[cameraId] = calculatorState;
  return calculators;
};

export default flareCXReducer;
