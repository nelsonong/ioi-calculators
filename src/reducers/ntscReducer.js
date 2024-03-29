import calculateDataRate from '../components/NTSCCalculator/utils/calculateDataRate';
import {
  INITIALIZE_NTSC_DVR_STATE,
  UPDATE_NTSC_INPUT,
  UPDATE_NTSC_FORMAT,
  UPDATE_NTSC_COLOR,
} from '../actions/ntscActions';
import {
  FORMAT,
  INPUT_FORMAT,
  INPUT_COLOR,
} from '../components/NTSCCalculator/constants';

const updateOutput = (calculatorState) => {
  const dataRate = calculateDataRate(calculatorState);
  return {
    ...calculatorState,
    dataRate,
  };
};

const ntscReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_NTSC_DVR_STATE: {
      const { initialized } = calculatorState;
      if (initialized) {
        return state;
      }

      calculatorState = {
        ...calculatorState,
        initialized: true,
      };
      break;
    }

    case UPDATE_NTSC_INPUT: {
      const { input } = action;
      const model = input;
      const format = INPUT_FORMAT[input];
      const color = INPUT_COLOR[input];
      const width = (format === FORMAT.Type480i) ? 640 : 768;
      const height = (format === FORMAT.Type480i) ? 480 : 576;
      const frameRate = (format === FORMAT.Type480i) ? 59.94 : 50;
      calculatorState = {
        ...calculatorState,
        model,
        input,
        format,
        color,
        width,
        height,
        frameRate,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_NTSC_FORMAT: {
      const { format } = action;
      const frameRate = (format === FORMAT.Type480i) ? 59.94 : 50;
      calculatorState = {
        ...calculatorState,
        format,
        frameRate,
      };
      calculatorState = updateOutput(calculatorState);
      break;
    }

    case UPDATE_NTSC_COLOR: {
      const { color } = action;
      calculatorState = {
        ...calculatorState,
        color,
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

export default ntscReducer;
