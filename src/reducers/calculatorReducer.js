import { clDefaultState } from '../components/FlareCLCalculator/constants';
import { cxDefaultState } from '../components/FlareCXCalculator/constants';
import {
    ADD_CALCULATOR,
    DELETE_CALCULATOR,
    MOVE_CALCULATOR,
    CLEAR_CALCULATORS
} from '../actions/calculatorActions';

const calculatorsReducer = (state = new Map(), action) => {
    switch (action.type) {
        case ADD_CALCULATOR:
            const { id, cameraType } = action;
            switch (cameraType) {
                case 'flare-cl':
                    state = new Map(state);
                    state.set(
                        id,
                        clDefaultState
                    );
                    break;

                case 'flare-cx':
                    state = new Map(state);
                    state.set(
                        id,
                        cxDefaultState
                    );
                    break;

                default:
                    return state;
            }
            return state;

        case MOVE_CALCULATOR:
            const { oldIndex, newIndex } = action;

            // Convert to array
            let stateArray = Array.from(state);

            // Swap
            const temp = stateArray[oldIndex];
            stateArray[oldIndex] = stateArray[newIndex];
            stateArray[newIndex] = temp;

            // Convert back to map
            state = new Map(stateArray.map(i => [ i[0], i[1] ]));
            return state;

        case DELETE_CALCULATOR:
            const { id } = action;
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