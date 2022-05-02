import { flareCLDefaultState } from '../components/FlareCLCalculator/constants';
import { flareCXDefaultState } from '../components/FlareCXCalculator/constants';
import { flareSDIDefaultState } from '../components/FlareSDICalculator/constants';
import { redwoodDefaultState } from '../components/RedwoodCalculator/constants';
import { victoremCXDefaultState } from '../components/VictoremCXCalculator/constants';
import { victoremSDIDefaultState } from '../components/VictoremSDICalculator/constants';
import { volucamDefaultState } from '../components/VolucamCalculator/constants';
import { core2DefaultState } from '../components/Core2Calculator/constants';
import { rodeoDefaultState } from '../components/RodeoCalculator/constants';
import {
  ADD_CALCULATOR,
  DELETE_CALCULATOR,
  MOVE_CALCULATOR,
  CLEAR_CALCULATORS,
} from '../actions/managementActions';

const managementReducer = (inputState = { order: [] }, action) => {
  let state = { ...inputState };
  switch (action.type) {
    case ADD_CALCULATOR: {
      const {
        id,
        cameraType,
      } = action;
      let defaultState;
      switch (cameraType) {
        case 'flare-cl':
          defaultState = flareCLDefaultState;
          break;

        case 'flare-cx':
          defaultState = flareCXDefaultState;
          break;

        case 'flare-sdi':
          defaultState = flareSDIDefaultState;
          break;

        case 'redwood':
          defaultState = redwoodDefaultState;
          break;

        case 'victorem-cx':
          defaultState = victoremCXDefaultState;
          break;

        case 'victorem-sdi':
          defaultState = victoremSDIDefaultState;
          break;

        case 'volucam':
          defaultState = volucamDefaultState;
          break;

        case 'core2':
          defaultState = core2DefaultState;
          break;

        case 'rodeo':
          defaultState = rodeoDefaultState;
          break;

        default:
          return state;
      }

      return {
        ...state,
        [id]: defaultState,
        order: state.order.concat(id),
      };
    }

    case MOVE_CALCULATOR: {
      const {
        oldIndex,
        newIndex,
      } = action;
      const { order } = state;

      // Shift elements left or right
      if (oldIndex < newIndex) {
        const temp = order[oldIndex];
        for (let i = oldIndex; i <= newIndex - 1; i += 1) {
          order[i] = order[i + 1];
        }

        order[newIndex] = temp;
      } else if (oldIndex > newIndex) {
        const temp = order[oldIndex];
        for (let i = oldIndex; i >= newIndex + 1; i -= 1) {
          order[i] = order[i - 1];
        }

        order[newIndex] = temp;
      }

      // Return swapped
      return {
        ...state,
        order,
      };
    }

    case DELETE_CALCULATOR: {
      const { id } = action;

      // Remove property
      state = { ...state };
      delete state[id];

      // Remove from ordered list
      if (state.order.length > 0) {
        state = {
          ...state,
          order: state.order.filter(orderId => orderId !== id),
        };
      }

      return state;
    }

    case CLEAR_CALCULATORS:
      return { order: [] };

    default:
      return state;
  }
};

export default managementReducer;
