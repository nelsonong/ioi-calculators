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
  model: MODEL.Type4B523MCX,
  models: MODELS.ALL,
  sensor: SENSOR[MODEL.Type4B523MCX],
  format: FORMAT.CXP3x1,
  formats: FORMATS.CX4B,
  adcBitDepth: 8,
  adcBitDepths: [8, 10, 12],
  outputBitDepth: 8,
  resolutionPreset: RESOLUTION.MAXIMUM,
  resolutionPresets: RESOLUTION_PRESETS[MODEL.Type4B523MCX],
  width: 720,
  widthSensor: 720,
  widthOutput: 720,
  widthStep: 8,
  maxWidth: 720,
  height: 544,
  heightSensor: 544,
  heightOutput: 544,
  heightStep: 4,
  maxHeight: 544,
  resolutionTooltip: '',
  cameraMode: 2,
  subSamplingBinning: SUBSAMPLING_BINNING.NONE,
  sensorDriveMode: SENSOR_DRIVE_MODE.ALL_12,
  frameRate: 523.581,
  maxFrameRate: 523.581,
  dataRate: 195.576,
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
