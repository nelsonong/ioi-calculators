import { CONFIG } from './configurations';

export const MODE = {
    // CL
    BASE: 'BASE',
    FULL: 'FULL',
    DUAL_FULL: 'DUAL_FULL',

    // CX/SDI
    SINGLE: 'SINGLE',
    DUAL: 'DUAL',
    QUAD: 'QUAD',

    // GEV
    GEV: 'GEV',

    // NTSC
    NTSC: 'NTSC'
};

export const MODES = {
    // Camera Link modes
    [CONFIG.CL.BASEx4]: [
        MODE.BASE,
        MODE.BASE,
        MODE.BASE,
        MODE.BASE
    ],
    [CONFIG.CL.FULL_BASEx2]: [
        MODE.FULL,
        MODE.BASE,
        MODE.BASE,
    ],
    [CONFIG.CL.FULLx2]: [
        MODE.FULL,
        MODE.FULL,
    ],
    [CONFIG.CL.DUAL_FULL]: [
        MODE.DUAL_FULL
    ],
    [CONFIG.CL.BASE_IOx2]: [
        MODE.BASE,
        MODE.BASE
    ],
    [CONFIG.CL.FULL_IO]: [
        MODE.DUAL_FULL
    ],
    // CoaXPress modes
    [CONFIG.CX.SINGLEx4]: [
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE
    ],
    [CONFIG.CX.DUALx2]: [
        MODE.DUAL,
        MODE.DUAL
    ],
    [CONFIG.CX.SINGLEx2_DUAL]: [
        MODE.DUAL,
        MODE.SINGLE,
        MODE.SINGLE
    ],
    [CONFIG.CX.QUAD]: [
        MODE.QUAD
    ],
    // SDI modes
    [CONFIG.SDI.SINGLEx4]: [
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE,
        MODE.SINGLE
    ],
    [CONFIG.SDI.DUALx2]: [
        MODE.DUAL,
        MODE.DUAL
    ],
    [CONFIG.SDI.QUAD]: [
        MODE.QUAD
    ],
    [CONFIG.SDI.SINGLE_IOx2]: [
        MODE.BASE,
        MODE.BASE
    ],
    [CONFIG.SDI.DUAL_IO]: [
        MODE.DUAL_FULL
    ],
    [CONFIG.GEV.DEFAULT]: [
        MODE.GEV,
        MODE.GEV
    ],
    [CONFIG.NTSC.DEFAULT]: [
        MODE.NTSC,
        MODE.NTSC,
        MODE.NTSC,
        MODE.NTSC
    ]
};