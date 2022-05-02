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

const version = '1.14';
const persistedVersion = loadVersion();
let persistedState = loadState();

// Check for version change
if (persistedVersion !== version) {
  if (!persistedState) {
    // eslint-disable-next-line no-console
    console.log(`v${version} initialized.`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Version change detected: v${version}. Resetting saved state and loading new version.`);
  }
  persistedState = undefined;
  saveVersion(version);
  saveState(persistedState);
} else {
  // eslint-disable-next-line no-console
  console.log(`v${version} loaded.`);
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
