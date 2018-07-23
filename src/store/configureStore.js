import { createStore, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import cameraReducer from '../reducers/cameraReducer';
import storageReducer from '../reducers/storageReducer';

//localStorage.removeItem('state');
const persistedState = loadState();

const configureStore = () => {
    const store = createStore(
        combineReducers({
            frameRateCalculators: cameraReducer,
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