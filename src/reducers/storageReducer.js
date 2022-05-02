import { core2ActionTypes } from '../actions/core2Actions';
import { rodeoActionTypes } from '../actions/rodeoActions';
import { managementActionTypes } from '../actions/managementActions';
import core2Reducer from './core2Reducer';
import rodeoReducer from './rodeoReducer';
import managementReducer from './managementReducer';
import cameraReducer from './cameraReducer';

const storageReducer = (state = { order: [] }, inputAction) => {
  const action = { ...inputAction };
  if (core2ActionTypes.includes(action.type)) {
    return core2Reducer(state, action);
  } if (rodeoActionTypes.includes(action.type)) {
    return rodeoReducer(state, action);
  }

  if (action.storage && managementActionTypes.includes(action.type)) {
    return managementReducer(state, action);
  }

  if (action.dvrId) {
    const { dvrId } = action;

    // Get storage calculator state
    const calculators = { ...state };
    const calculatorState = calculators[dvrId];

    // Pass modified camera to camera reducer
    action.fromStorageReducer = true;
    calculatorState.cameras = cameraReducer(calculatorState.cameras, action);
    calculators[dvrId] = calculatorState;
    return calculators;
  }

  return state;
};

export default storageReducer;
