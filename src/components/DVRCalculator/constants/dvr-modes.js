import { DVR_CONFIG } from './dvr-configurations';

export const DVR_CL_MODE = {
    BASE: 'BASE',
    FULL: 'FULL',
    DUAL_FULL: 'DUAL_FULL'
};

export const DVR_CX_MODE = {
    SINGLE: 'SINGLE',
    DUAL: 'DUAL',
    QUAD: 'QUAD'
};

export const DVR_MODES = {
    // Camera Link modes
    [DVR_CONFIG.CL.BASEx4]: [
        DVR_CL_MODE.BASE,
        DVR_CL_MODE.BASE,
        DVR_CL_MODE.BASE,
        DVR_CL_MODE.BASE
    ],
    [DVR_CONFIG.CL.FULL_BASEx2]: [
        DVR_CL_MODE.FULL,
        DVR_CL_MODE.BASE,
        DVR_CL_MODE.BASE,
    ],
    [DVR_CONFIG.CL.FULLx2]: [
        DVR_CL_MODE.FULL,
        DVR_CL_MODE.FULL,
    ],
    [DVR_CONFIG.CL.DUAL_FULL]: [
        DVR_CL_MODE.DUAL_FULL
    ],
    [DVR_CONFIG.CL.BASE_IOx2]: [
        DVR_CL_MODE.BASE,
        DVR_CL_MODE.BASE
    ],
    [DVR_CONFIG.CL.FULL_IO]: [
        DVR_CL_MODE.DUAL_FULL
    ],
    // CoaXPress modes
    [DVR_CONFIG.CX.SINGLEx4]: [
        DVR_CX_MODE.SINGLE,
        DVR_CX_MODE.SINGLE,
        DVR_CX_MODE.SINGLE,
        DVR_CX_MODE.SINGLE
    ],
    [DVR_CONFIG.CX.DUALx2]: [
        DVR_CX_MODE.DUAL,
        DVR_CX_MODE.DUAL
    ],
    [DVR_CONFIG.CX.SINGLEx2_DUAL]: [
        DVR_CX_MODE.DUAL,
        DVR_CX_MODE.SINGLE,
        DVR_CX_MODE.SINGLE
    ],
    [DVR_CONFIG.CX.QUAD]: [
        DVR_CX_MODE.QUAD
    ]
};