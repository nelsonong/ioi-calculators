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
  model: MODEL.Type24A164MCX,
  models: MODELS.ALL,
  modelFilters: [],
  sensor: SENSOR[MODEL.Type24A164MCX],
  format: FORMAT.CXP3x2,
  formats: FORMATS.CX24A,
  adcBitDepth: 10,
  adcBitDepths: [10, 12],
  resolutionPreset: RESOLUTION.MAXIMUM,
  resolutionPresets: RESOLUTION_PRESETS[MODEL.Type24A164MCX],
  width: 1936,
  widthStep: 16,
  maxWidth: 1936,
  height: 1216,
  heightStep: 4,
  maxHeight: 1216,
  resolutionTooltip: '',
  cameraMode: 2,
  subSamplingBinning: SUBSAMPLING_BINNING.NONE,
  sensorDriveMode: SENSOR_DRIVE_MODE.ALL_12,
  frameRate: 164.47,
  dataRate: 466.18,
  supports2x2Binning: false,
  supportsSubSampling: false,
  supportsHorizontalBinning: false,
  supportsVerticalBinning: false,
  error: false,
  initialized: false,
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
