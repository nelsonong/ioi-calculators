import {
  MODEL,
  MODELS,
} from './models';
import {
  CONFIG,
  CX_CONFIGS,
} from './configurations';
import {
  DRIVES,
  DRIVE_CAPACITY,
} from './drives';
import LINK from './links';
import {
  MODE,
  MODES,
} from './modes';

export const rodeoDefaultState = {
  cameraType: 'rodeo',
  model: MODEL.RODEOCX,
  link: LINK.CX,
  configuration: CONFIG.CX.SINGLEx1,
  configurations: CX_CONFIGS,
  cameras: null,
  cameraContainers: [],
  dataRateTooltip: '',
  dataRates: [],
  totalDataRate: 0,
  raid: 0,
  driveCapacity: 447.1,
  driveAmount: 1,
  driveAmounts: [1],
  driveTooltip: '',
  totalCapacity: 447.1,
  recordingTime: 'N/A',
  copiedCameraState: null,
};

export {
  MODEL,
  MODELS,
  CONFIG,
  CX_CONFIGS,
  DRIVES,
  DRIVE_CAPACITY,
  LINK,
  MODE,
  MODES,
};
