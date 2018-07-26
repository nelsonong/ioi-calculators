import {
  LINK_SPEEDS,
  FORMATS,
} from './formats';
import {
  RESOLUTION,
  RESOLUTIONS,
} from './resolutions';
import MODE from './modes';

export const customCXDefaultState = {
  cameraType: 'custom-cx',
  model: 'Custom',
  formats: FORMATS.CX2_4m,
  bitDepth: 8,
  linkCount: 1,
  linkSpeed: LINK_SPEEDS.CXP3,
  resolutionPreset: '1920x1080',
  width: 1920,
  height: 1080,
  frameRate: 30,
  dataRate: 59.32,
};

export {
  LINK_SPEEDS,
  FORMATS,
  RESOLUTION,
  RESOLUTIONS,
  MODE,
};
