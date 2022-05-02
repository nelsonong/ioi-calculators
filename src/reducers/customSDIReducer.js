import {
  INTERFACE,
  RESOLUTION,
  MODE,
  SDI_TREE,
} from '../components/CustomSDICalculator/constants';
import { MODEL } from '../components/Core2Calculator/constants';
import calculateDataRate from '../components/CustomSDICalculator/utils/calculateDataRate';
import {
  INITIALIZE_CUSTOM_SDI_DVR_STATE,
  UPDATE_CUSTOM_SDI_INTERFACE,
  UPDATE_CUSTOM_SDI_RESOLUTION,
  UPDATE_CUSTOM_SDI_COLOR,
  UPDATE_CUSTOM_SDI_FRAME_RATE,
} from '../actions/customSDIActions';

const updateDataRate = (calculatorState) => {
  const dataRate = calculateDataRate(calculatorState);
  return {
    ...calculatorState,
    dataRate,
  };
};

const customSDIReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_CUSTOM_SDI_DVR_STATE: {
      const {
        mode,
        model,
      } = action;
      const { initialized } = calculatorState;
      if (initialized) {
        return state;
      }

      let sdiInterfaces = Object.keys(SDI_TREE);
      const {
        SD_SDI,
        HD_SDI,
        S_3G_SDI,
        D_3G_SDI,
        Q_3G_SDI,
      } = INTERFACE;
      if (mode) {
        switch (mode) {
          case MODE.SINGLE:
            if (model === MODEL.CORE2SDI) {
              sdiInterfaces = [SD_SDI];
            } else {
              sdiInterfaces = [];
            }

            sdiInterfaces = [...sdiInterfaces, HD_SDI, S_3G_SDI];
            break;

          case MODE.DUAL:
            sdiInterfaces = [D_3G_SDI];
            break;

          case MODE.QUAD:
            sdiInterfaces = [Q_3G_SDI];

          default:
            break;
        }
      }

      const sdiInterface = sdiInterfaces[0];
      calculatorState = {
        ...calculatorState,
        sdiInterface,
        sdiInterfaces,
        initialized: true,
      };
    }

    case UPDATE_CUSTOM_SDI_INTERFACE: {
      const { sdiInterface } = action.sdiInterface ? action : calculatorState;
      const resolutions = Object.keys(SDI_TREE[sdiInterface]);
      const resolution = resolutions[0];
      const [width, height, interlaced] = RESOLUTION[resolution];
      calculatorState = {
        ...calculatorState,
        sdiInterface,
        width,
        height,
        interlaced,
        resolution,
        resolutions,
      };
    }

    case UPDATE_CUSTOM_SDI_RESOLUTION: {
      const { resolution } = action.resolution ? action : calculatorState;
      const { sdiInterface } = calculatorState;
      const colors = Object.keys(SDI_TREE[sdiInterface][resolution]);
      const color = colors[0];
      const [width, height, interlaced] = RESOLUTION[resolution];
      calculatorState = {
        ...calculatorState,
        resolution,
        width,
        height,
        interlaced,
        color,
        colors,
      };
    }

    case UPDATE_CUSTOM_SDI_COLOR: {
      const { color } = action.color ? action : calculatorState;
      const {
        sdiInterface,
        interlaced,
        resolution,
      } = calculatorState;
      const frameRates = SDI_TREE[sdiInterface][resolution][color];
      const frameRate = frameRates[0];
      calculatorState = {
        ...calculatorState,
        color,
        frameRate,
        frameRates,
      };
    }

    case UPDATE_CUSTOM_SDI_FRAME_RATE: {
      const { frameRate } = action.frameRate ? action : calculatorState;
      calculatorState = {
        ...calculatorState,
        frameRate,
      };
      calculatorState = updateDataRate(calculatorState);
      break;
    }

    default:
      return state;
  }

  calculators[cameraId] = calculatorState;
  return calculators;
};

export default customSDIReducer;
