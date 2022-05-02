import {
  MODEL,
  MODELS,
} from './models';
import {
  SENSOR,
  SENSORS,
} from './sensors';
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

export const redwoodDefaultState = {
  cameraType: 'redwood',
  model: MODEL.Type654G71MCX,
  models: MODELS.ALL,
  sensor: SENSORS[MODEL.Type654G71MCX],
  format: FORMAT.CXP12x4,
  formats: FORMATS.CXX,
  adcBitDepth: 10,
  adcBitDepths: [10, 12],
  outputBitDepth: 10,
  resolutionPreset: RESOLUTION.MAXIMUM,
  resolutionPresets: RESOLUTION_PRESETS[MODEL.Type654G71MCX],
  width: 8192,
  widthOutput: 8192,
  widthStep: 64,
  maxWidth: 8192,
  height: 5468,
  heightOutput: 5468,
  heightStep: 8,
  maxHeight: 5468,
  resolutionTooltip: '',
  frameRate: 52.20,
  maxFrameRate: 52.20,
  dataRate: 2229.92,
  cameraMode: 0,
  dualGain: false,
  subSamplingBinning: SUBSAMPLING_BINNING.NONE,
  sensorDriveMode: SENSOR_DRIVE_MODE.ALL_12,
  supportsSubSampling: true,
  supportsHorizontalBinning: true,
  supportsVerticalBinning: true,
  supports2x2Binning: true,
  error: false,
  initialized: false,
};

export {
  MODEL,
  MODELS,
  SENSOR,
  SENSORS,
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
