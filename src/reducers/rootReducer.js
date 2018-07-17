import { calculatorActionTypes } from '../actions/calculatorActions';
import { flareCLActionTypes } from '../actions/flareCLActions';
import { flareCXActionTypes } from '../actions/flareCXActions';
import calculatorReducer from '../reducers/calculatorReducer';
import flareCLReducer from '../reducers/flareCLReducer';
import flareCXReducer from '../reducers/flareCXReducer';

const rootReducer = (state = new Map(), action) => {
    if (calculatorActionTypes.includes(action.type)) {
        return calculatorReducer(state, action);
    } else if (flareCLActionTypes.includes(action.type)) {
        return flareCLReducer(state, action);
    } else if (flareCXActionTypes.includes(action.type)) {
        return flareCXReducer(state, action);
    }
    return state;
}

export default rootReducer;