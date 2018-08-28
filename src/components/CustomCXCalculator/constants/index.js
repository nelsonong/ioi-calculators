import FORMATS from './formats';
import {
  RESOLUTION,
  RESOLUTIONS,
} from './resolutions';
import MODE from './modes';

export const customCXDefaultState = {
  cameraType: 'custom-cx',
  model: 'Custom',
  bitDepth: FORMATS[0],
  linkCount: 1,
  resolutionPreset: '1920x1080',
  width: 1920,
  height: 1080,
  frameRate: 30,
  frameRateOutput: 30,
  dataRate: 59.32,
  initialized: false,
};

export {
  FORMATS,
  RESOLUTION,
  RESOLUTIONS,
  MODE,
};
