import { DVR_CONFIG } from './dvr-configurations';

export const MODE = {
    // CL
    BASE: 'BASE',
    FULL: 'FULL',
    DUAL_FULL: 'DUAL_FULL',

    // CX/SDI
    SINGLE: 'SINGLE',
    DUAL: 'DUAL',
    QUAD: 'QUAD'
};

export const MODES = {
    // Camera Link modes
    [DVR_CONFIG.CL.BASEx4]: [
        MODE.BASE,
        MODE.BASE,
        MODE.BASE,
        MODE.BASE
    ],
    [DVR_CONFIG.CL.FULL_BASEx2]: [
        MODE.FULL,
        MODE.BASE,
        MODE.BASE,
    ],
    [DVR_CONFIG.CL.FULLx2]: [
        MODE.FULL,
        MODE.FULL,
    ],
    [DVR_CONFIG.CL.DUAL_FULL]: [
        MODE.DUAL_FULL
    ],
    [DVR_CONFIG.CL.BASE_IOx2]: [
        MODE.BASE,
        MODE.BASE
    ],
    [DVR_CONFIG.CL.FULL_IO]: [
        MODE.DUAL_FULL
    ],
    // CoaXPress modes
    [DVR_CONFIG.CX.SINGLEx4]: [
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE
    ],
    [DVR_CONFIG.CX.DUALx2]: [
        MODE.DUAL,
        MODE.DUAL
    ],
    [DVR_CONFIG.CX.SINGLEx2_DUAL]: [
        MODE.DUAL,
        MODE.SINGLE,
        MODE.SINGLE
    ],
    [DVR_CONFIG.CX.QUAD]: [
        MODE.QUAD
    ],
    // SDI modes
    [DVR_CONFIG.SDI.SINGLEx4]: [
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE
    ],
    [DVR_CONFIG.SDI.DUALx2]: [
        MODE.DUAL,
        MODE.DUAL
    ],
    [DVR_CONFIG.SDI.QUAD]: [
        MODE.QUAD
    ],
    [DVR_CONFIG.SDI.SINGLE_IOx2]: [
        MODE.BASE,
        MODE.BASE
    ],
    [DVR_CONFIG.SDI.DUAL_IO]: [
        MODE.DUAL_FULL
    ],
};