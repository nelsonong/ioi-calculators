import {
  MODEL,
  MODELS,
} from './models';
import SENSOR from './sensors';
import {
  FORMAT,
  FORMATS,
} from './formats';
import {
  RESOLUTION,
  RESOLUTION_VALUES,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MAX_RESOLUTIONS,
  RESOLUTION_PRESETS,
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
  format: FORMAT.CXP6x2,
  formats: FORMATS.CXX,
  bitDepth: 8,
  bitDepths: [8, 10, 12],
  resolutionPreset: RESOLUTION.MAXIMUM,
  resolutionPresets: RESOLUTION_PRESETS[MODEL.Type51B163MCX],
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
  RESOLUTION,
  RESOLUTION_VALUES,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MAX_RESOLUTIONS,
  RESOLUTION_PRESETS,
  SUBSAMPLING_BINNING,
  SENSOR_DRIVE_MODE,
  SENSOR_DRIVE_MODES,
  MODE,
};
