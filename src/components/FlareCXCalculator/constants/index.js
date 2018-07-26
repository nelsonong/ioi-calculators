import {
  MODEL,
  MODELS,
  COLOR_MODELS,
} from './models';
import {
  LINK_SPEEDS,
  FORMATS,
} from './formats';
import {
  RESOLUTION,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
} from './resolutions';
import MODE from './modes';

export const flareCXDefaultState = {
  cameraType: 'flare-cx',
  model: MODEL.Type2M280MCX,
  models: MODELS,
  formats: FORMATS.CX2_4m,
  bitDepth: 8,
  linkCount: 1,
  linkSpeed: LINK_SPEEDS.CXP3,
  resolutionPreset: RESOLUTION.MAXIMUM,
  width: 2048,
  widthStep: 8,
  height: 1088,
  heightStep: 2,
  resolutionTooltip: '',
  subSampling: false,
  frameRate: 132.72,
  dataRate: 282.03,
  error: false,
};

export {
  MODEL,
  MODELS,
  COLOR_MODELS,
  LINK_SPEEDS,
  FORMATS,
  RESOLUTION,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MODE,
};
