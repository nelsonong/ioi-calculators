import {
  MODEL,
  MODELS,
  INTERFACE,
  RESOLUTION,
  MODE,
  SDI_TREE,
} from '../components/VictoremSDICalculator/constants';
import calculateDataRate from '../components/VictoremSDICalculator/utils/calculateDataRate';
import {
  INITIALIZE_VICTOREM_SDI_DVR_STATE,
  UPDATE_VICTOREM_SDI_MODEL,
  UPDATE_VICTOREM_SDI_INTERFACE,
  UPDATE_VICTOREM_SDI_RESOLUTION,
  UPDATE_VICTOREM_SDI_COLOR,
  UPDATE_VICTOREM_SDI_FRAME_RATE,
} from '../actions/victoremSDIActions';

const updateDataRate = (calculatorState) => {
  const dataRate = calculateDataRate(calculatorState);
  return {
    ...calculatorState,
    dataRate,
  };
};

const victoremSDIReducer = (state = { order: [] }, action) => {
  const {
    cameraId,
    type,
  } = action;
  const calculators = { ...state };
  let calculatorState = calculators[cameraId];
  switch (type) {
    case INITIALIZE_VICTOREM_SDI_DVR_STATE: {
      const { mode } = action;
      const { initialized } = calculatorState;
      if (initialized) {
        return state;
      }

      let models = MODELS;
      if (mode) {
        switch (mode) {
          case MODE.SINGLE:
            models = [MODEL.Type2KSDIMini, MODEL.Type4KSDIMini];
            break;

          case MODE.DUAL:
            models = [MODEL.Type4KSDIMini];
            break;

          case MODE.QUAD:
            models = [MODEL.Type4KSDIMini];

          default:
            break;
        }
      }

      const model = models[0];
      calculatorState = {
        ...calculatorState,
        model,
        models,
        initialized: true,
      };
    }

    case UPDATE_VICTOREM_SDI_MODEL: {
      const { model } = action.model ? action : calculatorState;
      const { mode } = calculatorState;
      let sdiInterfaces = Object.keys(SDI_TREE[model]);
      if (mode) {
        const {
          HD_SDI,
          S_3G_SDI,
          D_3G_SDI,
          Q_3G_SDI,
          S_6G_SDI,
          S_12G_SDI,
        } = INTERFACE;
        if (model === MODEL.Type4KSDIMini) {
          switch (mode) {
            case MODE.SINGLE:
              sdiInterfaces = [HD_SDI, S_3G_SDI, S_6G_SDI, S_12G_SDI];
              break;

            case MODE.DUAL:
              sdiInterfaces = [D_3G_SDI];
              break;

            case MODE.QUAD:
              sdiInterfaces = [Q_3G_SDI];

            default:
              break;
          }
        } else if (model === MODEL.Type2KSDIMini) {
          sdiInterfaces = [HD_SDI, S_3G_SDI];
        }
      }

      const sdiInterface = sdiInterfaces[0];
      calculatorState = {
        ...calculatorState,
        model,
        sdiInterface,
        sdiInterfaces,
      };
    }

    case UPDATE_VICTOREM_SDI_INTERFACE: {
      const { sdiInterface } = action.sdiInterface ? action : calculatorState;
      const { model } = calculatorState;
      const resolutions = Object.keys(SDI_TREE[model][sdiInterface]);
      const resolution = resolutions[0];
      const [
        width,
        height,
        interlaced,
      ] = RESOLUTION[resolution];
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

    case UPDATE_VICTOREM_SDI_RESOLUTION: {
      const { resolution } = action.resolution ? action : calculatorState;
      const {
        model, sdiInterface,
      } = calculatorState;
      const colors = Object.keys(SDI_TREE[model][sdiInterface][resolution]);
      const color = colors[0];
      const [
        width,
        height,
        interlaced,
      ] = RESOLUTION[resolution];
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

    case UPDATE_VICTOREM_SDI_COLOR: {
      const { color } = action.color ? action : calculatorState;
      const {
        model, sdiInterface, resolution,
      } = calculatorState;
      const frameRates = SDI_TREE[model][sdiInterface][resolution][color];
      const frameRate = frameRates[0];
      calculatorState = {
        ...calculatorState,
        color,
        frameRate,
        frameRates,
      };
    }

    case UPDATE_VICTOREM_SDI_FRAME_RATE: {
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

export default victoremSDIReducer;
