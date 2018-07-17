import { calculatorActionTypes } from '../actions/calculatorActions';
import { flareCLActionTypes } from '../actions/flareCLActions';
import calculatorReducer from '../reducers/calculatorReducer';
import flareCLReducer from '../reducers/flareCLReducer';

const rootReducer = (state = new Map(), action) => {
    if (calculatorActionTypes.includes(action.type)) {
        return calculatorReducer(state, action);
    } else if (flareCLActionTypes.includes(action.type)) {
        return flareCLReducer(state, action);
    }
    return state;
}

export default rootReducer;