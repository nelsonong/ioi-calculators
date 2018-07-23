import { dvrActionTypes } from '../actions/dvrActions';
import { managementActionTypes } from '../actions/managementActions';
import dvrReducer from './dvrReducer';
import managementReducer from './managementReducer';
import cameraReducer from './cameraReducer';

const storageReducer = (state = { order: [] }, action) => {
    if (dvrActionTypes.includes(action.type)) {
        return dvrReducer(state, action);
    } else if (action.storage && managementActionTypes.includes(action.type)) {
        return managementReducer(state, action);
    } else if (!!action.dvrId) {
        const { dvrId } = action;

        // Get storage calculator state
        const calculators = { ...state };
        let calculatorState = calculators[dvrId];

        // Pass modified camera to camera reducer
        action.fromStorageReducer = true;
        calculatorState.cameras = cameraReducer(calculatorState.cameras, action);

        calculators[dvrId] = calculatorState;
        return calculators;
    }
    return state;
}

export default storageReducer;