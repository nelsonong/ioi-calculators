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
import {
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
  SENSOR_DRIVE_MODES,
} from './camera-options';
import MODE from './modes';

export const victoremCXDefaultState = {
  cameraType: 'victorem-cx',
  model: MODEL.Type51B163MCX,
  models: MODELS.ALL,
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
  cameraMode: 0,
  subSamplingBinning: SUBSAMPLING_BINNING.NONE,
  sensorDriveMode: SENSOR_DRIVE_MODE.ALL_12,
  frameRate: 46.66,
  dataRate: 225.43,
  supports2x2Binning: true,
  supportsSubSampling: true,
  supportsHorizontalBinning: true,
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
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
  SENSOR_DRIVE_MODES,
  MODE,
};
