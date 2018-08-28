import { RESOLUTION } from '../components/GEVCalculator/constants';
import calculateDataRate from '../components/GEVCalculator/utils/calculateDataRate';
import {
  INITIALIZE_GEV_DVR_STATE,
  UPDATE_GEV_BIT_DEPTH,
  UPDATE_GEV_RESOLUTION_PRESET,
  UPDATE_GEV_WIDTH,
  UPDATE_GEV_HEIGHT,
  UPDATE_GEV_FRAME_RATE,
} from '../actions/gevActions';

const updateOutput = (calculatorState) => {
  const dataRate = calculateDataRate(calculatorState);

  return {
    ...calculatorState,
    dataRate,
  };
};

const gevReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];

  switch (type) {
    case INITIALIZE_GEV_DVR_STATE: {
      const { initialized } = calculatorState;
      if (initialized) {
        return state;
      }
    }

    case UPDATE_GEV_BIT_DEPTH: {
      const { bitDepth } = action;
      calculatorState = {
        ...calculatorState,
        bitDepth,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_GEV_RESOLUTION_PRESET: {
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

    case UPDATE_GEV_WIDTH: {
      const { width } = action;
      calculatorState = {
        ...calculatorState,
        width,
        resolutionPreset: RESOLUTION.CUSTOM,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_GEV_HEIGHT: {
      const { height } = action;
      calculatorState = {
        ...calculatorState,
        height,
        resolutionPreset: RESOLUTION.CUSTOM,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_GEV_FRAME_RATE: {
      const { frameRate } = action;
      calculatorState = {
        ...calculatorState,
        frameRate,
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

export default gevReducer;
