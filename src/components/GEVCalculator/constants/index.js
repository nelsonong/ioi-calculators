import {
  RESOLUTION,
  RESOLUTIONS,
} from './resolutions';

export const gevDefaultState = {
  cameraType: 'gev',
  model: 'Camera',
  bitDepths: [8, 10, 12, 14, 16],
  bitDepth: 8,
  resolutionPreset: '1920x1080',
  width: 1920,
  height: 1080,
  frameRate: 30,
  dataRate: 59.32,
  initialized: false,
};

export {
  RESOLUTION,
  RESOLUTIONS,
};
