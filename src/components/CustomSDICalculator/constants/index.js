import INTERFACE from './interfaces';
import RESOLUTION from './resolutions';
import COLOR from './colors';
import MODE from './modes';
import SDI_TREE from './sdi-tree';

export const customSDIDefaultState = {
  cameraType: 'custom-sdi',
  model: 'Custom',
  sdiInterface: '',
  sdiInterfaces: [],
  width: 0,
  height: 0,
  resolution: '',
  resolutions: [],
  color: '',
  colors: [],
  frameRate: '',
  frameRates: [],
  dataRate: 0,
};

export {
  INTERFACE,
  RESOLUTION,
  COLOR,
  MODE,
  SDI_TREE,
};
