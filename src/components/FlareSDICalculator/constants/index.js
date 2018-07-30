import {
  MODEL,
  MODELS,
  COLOR_MODELS,
} from './models';
import INTERFACE from './interfaces';
import COLOR from './colors';
import RESOLUTION from './resolutions';
import MODE from './modes';
import SDI_TREE from './sdi-tree';

export const flareSDIDefaultState = {
  cameraType: 'flare-sdi',
  model: '',
  models: [],
  sdiInterface: '',
  sdiInterfaces: [],
  width: 0,
  height: 0,
  interlaced: false,
  resolution: '',
  resolutions: [],
  color: '',
  colors: [],
  frameRate: '',
  frameRates: [],
  dataRate: 0,
  initialized: false,
};

export {
  MODEL,
  MODELS,
  COLOR_MODELS,
  INTERFACE,
  RESOLUTION,
  COLOR,
  MODE,
  SDI_TREE,
};
