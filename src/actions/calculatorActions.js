const ADD_CALCULATOR = 'ADD_CALCULATOR';
const DELETE_CALCULATOR = 'DELETE_CALCULATOR';
const MOVE_CALCULATOR = 'MOVE_CALCULATOR';
const CLEAR_CALCULATORS = 'CLEAR_CALCULATORS';

const calculatorActionTypes = [
    ADD_CALCULATOR,
    DELETE_CALCULATOR,
    MOVE_CALCULATOR,
    CLEAR_CALCULATORS
];

// Action generators
export const addCalculator = (id, cameraType) => {
    return {
        type: ADD_CALCULATOR,
        id,
        cameraType
    };
};

export const moveCalculator = (oldIndex, newIndex) => ({
    type: MOVE_CALCULATOR,
    oldIndex,
    newIndex
});

export const deleteCalculator = (id) => ({
    type: DELETE_CALCULATOR,
    id
});

export const clearCalculators = () => ({
    type: CLEAR_CALCULATORS
});

// Action types
export {
    ADD_CALCULATOR,
    DELETE_CALCULATOR,
    MOVE_CALCULATOR,
    CLEAR_CALCULATORS,
    calculatorActionTypes
};