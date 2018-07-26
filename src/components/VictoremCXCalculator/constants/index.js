import {
  MODEL,
  MODELS,
} from './models';
import SENSOR from './sensors';
import {
  FORMAT,
  FORMATS,
  BIT_DEPTHS,
} from './formats';
import {
  RESOLUTION,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MAX_RESOLUTIONS,
} from './resolutions';
import CAMERA_OPTION from './camera-options';

export const victoremCXDefaultState = {
  cameraType: 'victorem-cx',
  model: MODEL.Type51B163MCX,
  sensor: SENSOR[MODEL.Type51B163MCX],
  format: FORMAT.CXP2x1,
  formats: FORMATS.CXX,
  bitDepth: 8,
  resolutionPreset: RESOLUTION.MAXIMUM,
  width: 2464,
  widthStep: 16,
  maxWidth: 2464,
  height: 2056,
  heightStep: 4,
  maxHeight: 2056,
  resolutionTooltip: '',
  cameraOption: CAMERA_OPTION.NONE,
  frameRate: 46.66,
  dataRate: 225.43,
  supports2x2Binning: true,
  supportsSubSampling: true,
  supportsVerticalBinning: true,
  error: false,
};

export {
  MODEL,
  MODELS,
  SENSOR,
  FORMAT,
  FORMATS,
  BIT_DEPTHS,
  RESOLUTION,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MAX_RESOLUTIONS,
  CAMERA_OPTION,
};
