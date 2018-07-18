import { dvrActionTypes } from '../actions/dvrActions';
import { managementActionTypes } from '../actions/managementActions';
import dvrReducer from './dvrReducer';
import managementReducer from './managementReducer';
import frameRateReducer from './frameRateReducer';

const storageReducer = (state = new Map(), action) => {
    if (dvrActionTypes.includes(action.type)) {
        return dvrReducer(state, action);
    } else if (action.storage && managementActionTypes.includes(action.type)) {
        return managementReducer(state, action);
    } else if (action.dvrId !== undefined) {
        action.processed = true;
        const { dvrId } = action;
        state = new Map(state);
        let dvrCalculator = state.get(dvrId);
        dvrCalculator.cameras = frameRateReducer(dvrCalculator.cameras, action);
        state.set(dvrId, dvrCalculator);
        return state;
    }
    return state;
}

export default storageReducer;