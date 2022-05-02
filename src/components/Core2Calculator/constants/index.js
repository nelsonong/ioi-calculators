import {
  MODEL,
  MODELS,
} from './models';
import {
  CONFIG,
  CL_CONFIGS, CLPLUS_CONFIGS, CLMAX_CONFIGS,
  CX_CONFIGS, CXPLUS_CONFIGS, CXMAX_CONFIGS,
  SDI_CONFIGS, SDIMAX_CONFIGS,
  GEV_CONFIGS, NTSC_CONFIGS,
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

export const core2DefaultState = {
  cameraType: 'core2',
  model: MODEL.CORE2CL,
  link: LINK.CL,
  configuration: CONFIG.CL.BASEx4,
  configurations: CL_CONFIGS,
  cameras: null,
  cameraContainers: [],
  dataRateTooltip: '',
  dataRates: [],
  totalDataRate: 0,
  raid: 0,
  driveCapacity: 223.6,
  driveAmount: 4,
  driveAmounts: [1, 2, 3, 4],
  driveTooltip: '',
  totalCapacity: 894.4,
  recordingTime: 'N/A',
  copiedCameraState: null,
};

export {
  MODEL,
  MODELS,
  CONFIG,
  CL_CONFIGS,
  CLPLUS_CONFIGS,
  CLMAX_CONFIGS,
  CX_CONFIGS,
  CXPLUS_CONFIGS,
  CXMAX_CONFIGS,
  SDI_CONFIGS,
  SDIMAX_CONFIGS,
  GEV_CONFIGS,
  NTSC_CONFIGS,
  DRIVES,
  DRIVE_CAPACITY,
  LINK,
  MODE,
  MODES,
};
