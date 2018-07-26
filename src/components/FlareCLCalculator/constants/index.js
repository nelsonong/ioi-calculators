import {
  MODEL,
  MODELS,
  COLOR_MODELS,
} from './models';
import {
  FORMAT,
  DUAL_FORMATS,
  FORMATS,
  SLOW_MODE_FORMATS,
} from './formats';
import {
  RESOLUTION,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
} from './resolutions';
import MODE from './modes';

export const flareCLDefaultState = {
  cameraType: 'flare-cl',
  model: MODEL.Type2M360MCL,
  hwversion: 1,
  format: FORMAT.Output2x8,
  formats: FORMATS.CL2_4m,
  resolutionPreset: RESOLUTION.MAXIMUM,
  width: 2048,
  widthStep: 8,
  height: 1088,
  heightStep: 2,
  resolutionTooltip: '',
  subSampling: false,
  slowMode: false,
  frameRate: 70.95,
  dataRate: 150.77,
  error: false,
};

export {
  MODEL,
  MODELS,
  COLOR_MODELS,
  FORMAT,
  DUAL_FORMATS,
  FORMATS,
  SLOW_MODE_FORMATS,
  RESOLUTION,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MODE,
};
