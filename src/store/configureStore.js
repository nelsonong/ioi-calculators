import { createStore, combineReducers } from 'redux';
import frameRateReducer from '../reducers/frameRateReducer';
import storageReducer from '../reducers/storageReducer';

const configureStore = () => createStore(
    combineReducers({
        frameRateCalculators: frameRateReducer,
        storageCalculators: storageReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;