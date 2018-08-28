import {
  RESOLUTION,
  MODE,
} from '../components/CustomCXCalculator/constants';
import calculateDataRate from '../components/CustomCXCalculator/utils/calculateDataRate';
import {
  INITIALIZE_CUSTOM_CX_DVR_STATE,
  UPDATE_CUSTOM_CX_BIT_DEPTH,
  UPDATE_CUSTOM_CX_LINK_COUNT,
  UPDATE_CUSTOM_CX_RESOLUTION_PRESET,
  UPDATE_CUSTOM_CX_WIDTH,
  UPDATE_CUSTOM_CX_HEIGHT,
  UPDATE_CUSTOM_CX_FRAME_RATE,
} from '../actions/customCXActions';

const updateOutput = (calculatorState) => {
  const dataRate = calculateDataRate(calculatorState);
  return {
    ...calculatorState,
    dataRate,
  };
};

const customCXReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_CUSTOM_CX_DVR_STATE: {
      const { mode } = action;
      const { initialized } = calculatorState;
      if (initialized) {
        return state;
      }

      let { linkCount } = calculatorState;
      switch (mode) {
        case MODE.SINGLE:
          linkCount = 1;
          break;

        case MODE.DUAL:
          linkCount = 2;
          break;

        case MODE.QUAD:
          linkCount = 4;
          break;

        default:
          break;
      }

      const { frameRate } = calculatorState;
      const frameRateOutput = frameRate * linkCount;
      calculatorState = {
        ...calculatorState,
        linkCount,
        frameRateOutput,
        initialized: true,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_CUSTOM_CX_BIT_DEPTH: {
      const { bitDepth } = action;
      calculatorState = {
        ...calculatorState,
        bitDepth,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_CUSTOM_CX_LINK_COUNT: {
      const { linkCount } = action;
      const { frameRate } = calculatorState;
      const frameRateOutput = frameRate * linkCount;
      calculatorState = {
        ...calculatorState,
        linkCount,
        frameRateOutput,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_CUSTOM_CX_RESOLUTION_PRESET: {
      const { resolutionPreset } = action;
      calculatorState = {
        ...calculatorState,
        resolutionPreset,
      };

      switch (resolutionPreset) {
        case RESOLUTION.CUSTOM:
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

      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_CUSTOM_CX_WIDTH: {
      const { width } = action;
      calculatorState = {
        ...calculatorState,
        width,
        resolutionPreset: RESOLUTION.CUSTOM,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_CUSTOM_CX_HEIGHT: {
      const { height } = action;
      calculatorState = {
        ...calculatorState,
        height,
        resolutionPreset: RESOLUTION.CUSTOM,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_CUSTOM_CX_FRAME_RATE: {
      const { frameRate } = action;
      const { linkCount } = calculatorState;
      const frameRateOutput = frameRate * linkCount;
      calculatorState = {
        ...calculatorState,
        frameRate,
        frameRateOutput,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[cameraId] = calculatorState;
  return calculators;
};

export default customCXReducer;
