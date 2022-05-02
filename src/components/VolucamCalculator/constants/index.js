import {
  MODEL,
  MODELS,
} from './models';
import SENSOR from './sensors';
import FORMAT from './formats';
import FIRMWARE from './firmware';
import {
  RESOLUTION,
  RESOLUTION_VALUES,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MAX_RESOLUTIONS,
  RESOLUTION_PRESETS,
} from './resolutions';
import {
  SENSOR_DRIVE_MODE,
  SENSOR_DRIVE_MODES,
} from './camera-options';
import {
  DRIVE,
  DRIVES,
  DRIVE_CAPACITY,
} from './drives';

export const volucamDefaultState = {
  cameraType: 'volucam',
  model: MODEL.Type24A164MV,
  models: MODELS.ALL,
  sensor: SENSOR[MODEL.Type24A164MV],
  format: FORMAT.VP3x2,
  adcBitDepth: 10,
  adcBitDepths: [10, 12],
  outputBitDepth: 10,
  cameraMode: 0,
  firmware: FIRMWARE.STANDARD,
  scaling: false,
  dualGain: false,
  sensorDriveMode: SENSOR_DRIVE_MODE.ALL_12,
  resolutionPreset: RESOLUTION.MAXIMUM,
  resolutionPresets: RESOLUTION_PRESETS[MODEL.Type24A164MV],
  width: 1920,
  widthStep: 64,
  maxWidth: 1920,
  height: 1216,
  heightStep: 8,
  maxHeight: 1216,
  resolutionTooltip: '',
  driveModel: DRIVE.VIDIOMOD480M2,
  frameRate: 164.47,
  maxFrameRate: 164.47,
  dataRate: 457.78,
  error: false,
  initialized: false,
  capacity: 512,
  recordingTime: 'N/A',
};

export {
  MODEL,
  MODELS,
  SENSOR,
  FORMAT,
  FIRMWARE,
  RESOLUTION,
  RESOLUTION_VALUES,
  RESOLUTIONS,
  NAN_RESOLUTIONS,
  MAX_RESOLUTIONS,
  RESOLUTION_PRESETS,
  SENSOR_DRIVE_MODE,
  SENSOR_DRIVE_MODES,
  DRIVE,
  DRIVES,
  DRIVE_CAPACITY,
};
