import { clDefaultState } from '../components/FlareCLCalculator/constants';
import {
    ADD_CALCULATOR,
    DELETE_CALCULATOR,
    CLEAR_CALCULATORS
} from '../actions/calculatorActions';

const calculatorsReducer = (state = new Map(), { type, id, cameraType }) => {
    switch (type) {
        case ADD_CALCULATOR:
            switch (cameraType) {
                case 'flare-cl':
                    state = new Map(state);
                    state.set(
                        id,
                        clDefaultState
                    );
                default:
                    return state;
            }

        case DELETE_CALCULATOR:
            state = new Map(state);
            state.delete(id);
            return state;

        case CLEAR_CALCULATORS:
            state = new Map(state);
            state.clear();
            return state;

        default:
            return state;
    }
}

export default calculatorsReducer;