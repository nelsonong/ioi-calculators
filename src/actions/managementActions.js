const ADD_CALCULATOR = 'ADD_CALCULATOR';
const DELETE_CALCULATOR = 'DELETE_CALCULATOR';
const MOVE_CALCULATOR = 'MOVE_CALCULATOR';
const CLEAR_CALCULATORS = 'CLEAR_CALCULATORS';

const managementActionTypes = [
  ADD_CALCULATOR,
  DELETE_CALCULATOR,
  MOVE_CALCULATOR,
  CLEAR_CALCULATORS,
];

// Action generators
export const addCalculator = (id, cameraType, storage = false) => ({
  type: ADD_CALCULATOR,
  id,
  cameraType,
  storage,
});

export const moveCalculator = (oldIndex, newIndex, storage = false) => ({
  type: MOVE_CALCULATOR,
  oldIndex,
  newIndex,
  storage,
});

export const deleteCalculator = (id, storage = false) => ({
  type: DELETE_CALCULATOR,
  id,
  storage,
});

export const clearCalculators = (storage = false) => ({
  type: CLEAR_CALCULATORS,
  storage,
});

// Action types
export {
  ADD_CALCULATOR,
  DELETE_CALCULATOR,
  MOVE_CALCULATOR,
  CLEAR_CALCULATORS,
  managementActionTypes,
};
