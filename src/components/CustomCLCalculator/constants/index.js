import {
  FORMAT,
  FORMATS,
  FORMAT_BITS,
} from './formats';
import {
  RESOLUTION,
  RESOLUTIONS,
} from './resolutions';
import MODE from './modes';

export const customCLDefaultState = {
  cameraType: 'custom-cl',
  model: 'Custom',
  format: FORMAT.Output1x8,
  formats: [],
  resolutionPreset: '1920x1080',
  width: 1920,
  height: 1080,
  frameRate: 30,
  dataRate: 59.32,
  initialized: false,
};

export {
  FORMAT,
  FORMATS,
  FORMAT_BITS,
  RESOLUTION,
  RESOLUTIONS,
  MODE,
};
