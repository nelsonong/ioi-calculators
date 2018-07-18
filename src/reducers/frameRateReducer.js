import { managementActionTypes } from '../actions/managementActions';
import { flareCLActionTypes } from '../actions/flareCLActions';
import { flareCXActionTypes } from '../actions/flareCXActions';
import { flareSDIActionTypes } from '../actions/flareSDIActions';
import { victoremCXActionTypes } from '../actions/victoremCXActions';
import { victoremSDIActionTypes } from '../actions/victoremSDIActions';
import managementReducer from '../reducers/managementReducer';
import flareCLReducer from '../reducers/flareCLReducer';
import flareCXReducer from '../reducers/flareCXReducer';
import flareSDIReducer from '../reducers/flareSDIReducer';
import victoremCXReducer from '../reducers/victoremCXReducer';
import victoremSDIReducer from '../reducers/victoremSDIReducer';

const frameRateReducer = (state = new Map(), action) => {
    if (action.dvrId !== undefined && action.processed === undefined) {
        return state;
    }

    if (!action.storage && managementActionTypes.includes(action.type)) {
        return managementReducer(state, action);
    } else if (flareCLActionTypes.includes(action.type)) {
        return flareCLReducer(state, action);
    } else if (flareCXActionTypes.includes(action.type)) {
        return flareCXReducer(state, action);
    } else if (flareSDIActionTypes.includes(action.type)) {
        return flareSDIReducer(state, action);
    } else if (victoremCXActionTypes.includes(action.type)) {
        return victoremCXReducer(state, action);
    } else if (victoremSDIActionTypes.includes(action.type)) {
        return victoremSDIReducer(state, action);
    }
    return state;
}

export default frameRateReducer;