import { CONFIG } from './configurations';

export const MODE = {
  // CX
  SINGLE: 'SINGLE',
  DUAL: 'DUAL',
  QUAD: 'QUAD',
};

export const MODES = {
  [CONFIG.CX.SINGLEx1]: [
    MODE.SINGLE,
  ],
  [CONFIG.CX.DUALx1]: [
    MODE.DUAL,
  ],
  [CONFIG.CX.QUADx1]: [
    MODE.QUAD,
  ],
};
