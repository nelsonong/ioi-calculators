import { managementActionTypes } from '../actions/managementActions';
import { flareCLActionTypes } from '../actions/flareCLActions';
import { flareCXActionTypes } from '../actions/flareCXActions';
import { flareSDIActionTypes } from '../actions/flareSDIActions';
import { redwoodActionTypes } from '../actions/redwoodActions';
import { victoremCXActionTypes } from '../actions/victoremCXActions';
import { victoremSDIActionTypes } from '../actions/victoremSDIActions';
import { volucamActionTypes } from '../actions/volucamActions';
import { customCLActionTypes } from '../actions/customCLActions';
import { customCXActionTypes } from '../actions/customCXActions';
import { customSDIActionTypes } from '../actions/customSDIActions';
import { gevActionTypes } from '../actions/gevActions';
import { ntscActionTypes } from '../actions/ntscActions';
import managementReducer from './managementReducer';
import flareCLReducer from './flareCLReducer';
import flareCXReducer from './flareCXReducer';
import flareSDIReducer from './flareSDIReducer';
import redwoodReducer from './redwoodReducer';
import victoremCXReducer from './victoremCXReducer';
import victoremSDIReducer from './victoremSDIReducer';
import volucamReducer from './volucamReducer';
import customCLReducer from './customCLReducer';
import customCXReducer from './customCXReducer';
import customSDIReducer from './customSDIReducer';
import gevReducer from './gevReducer';
import ntscReducer from './ntscReducer';

const cameraReducer = (state = { order: [] }, action) => {
  if (!!action.dvrId && !action.fromStorageReducer) {
    return state;
  }

  if (!action.storage && managementActionTypes.includes(action.type)) {
    return managementReducer(state, action);
  }

  if (flareCLActionTypes.includes(action.type)) {
    return flareCLReducer(state, action);
  }

  if (flareCXActionTypes.includes(action.type)) {
    return flareCXReducer(state, action);
  }

  if (flareSDIActionTypes.includes(action.type)) {
    return flareSDIReducer(state, action);
  }

  if (redwoodActionTypes.includes(action.type)) {
    return redwoodReducer(state, action);
  }

  if (victoremCXActionTypes.includes(action.type)) {
    return victoremCXReducer(state, action);
  }

  if (victoremSDIActionTypes.includes(action.type)) {
    return victoremSDIReducer(state, action);
  }

  if (volucamActionTypes.includes(action.type)) {
    return volucamReducer(state, action);
  }

  if (customCLActionTypes.includes(action.type)) {
    return customCLReducer(state, action);
  }

  if (customCXActionTypes.includes(action.type)) {
    return customCXReducer(state, action);
  }

  if (customSDIActionTypes.includes(action.type)) {
    return customSDIReducer(state, action);
  }

  if (gevActionTypes.includes(action.type)) {
    return gevReducer(state, action);
  }

  if (ntscActionTypes.includes(action.type)) {
    return ntscReducer(state, action);
  }

  return state;
};

export default cameraReducer;
