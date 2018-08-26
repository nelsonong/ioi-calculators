import {
  createStore,
  combineReducers,
} from 'redux';
import {
  loadState,
  saveState,
  loadVersion,
  saveVersion,
} from './localStorage';
import cameraReducer from '../reducers/cameraReducer';
import storageReducer from '../reducers/storageReducer';

const version = '1.00';
const persistedVersion = loadVersion();
let persistedState = loadState();

// Check for version change
if (persistedVersion !== version) {
  persistedState = undefined;
  saveVersion(version);
}

const configureStore = () => {
  const store = createStore(
    combineReducers({
      frameRateCalculators: cameraReducer,
      storageCalculators: storageReducer,
    }),
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export default configureStore;
