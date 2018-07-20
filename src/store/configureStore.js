import { createStore, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import frameRateReducer from '../reducers/frameRateReducer';
import storageReducer from '../reducers/storageReducer';

const persistedState = loadState();

const configureStore = () => {
    const store = createStore(
        combineReducers({
            frameRateCalculators: frameRateReducer,
            storageCalculators: storageReducer
        }),
        persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => {
        saveState(store.getState());
    })

    return store;
}

export default configureStore;