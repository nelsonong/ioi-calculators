export const CONFIG = {
    CL: {
        BASEx4: 'Base x4',
        FULL_BASEx2: 'Full + Base x2',
        FULLx2: 'Full x2',
        DUAL_FULL: 'Dual Full',
        BASE_IOx2: 'Base Input/Output x2',
        FULL_IO: 'Full Input/Output'
    },
    CX: {
        SINGLEx4: 'Single-Link x4',
        DUALx2: 'Dual-Link x2',
        SINGLEx2_DUAL: 'Single-Link x2 + Dual-Link',
        QUAD: 'Quad-Link'
    },
    SDI: {
        SINGLEx4: 'Single-Link x4',
        DUALx2: 'Dual-Link x2',
        QUAD: 'Quad-Link',
        SINGLE_IOx2: 'Single-Link x2 In/Out',
        DUAL_IO: 'Dual-Link In/Out'
    },
    GEV: {
        DEFAULT: 'Default'
    }
};

// Camera Link configurations
export const CL_CONFIGS = [
    CONFIG.CL.BASEx4,
    CONFIG.CL.FULL_BASEx2
];

export const CLPLUS_CONFIGS = Object.values(CONFIG.CL);

export const CLMAX_CONFIGS = [
    CONFIG.CL.BASEx4,
    CONFIG.CL.FULL_BASEx2,
    CONFIG.CL.FULLx2,
    CONFIG.CL.DUAL_FULL
];

// CoaXPress configurations
export const CX_CONFIGS = [
    CONFIG.CX.SINGLEx4,
    CONFIG.CX.DUALx2,
    CONFIG.CX.SINGLEx2_DUAL
];

export const CXPLUS_CONFIGS = Object.values(CONFIG.CX);

export const CXMAX_CONFIGS = Object.values(CONFIG.CX);

// SDI configurations
export const SDI_CONFIGS = Object.values(CONFIG.SDI);

export const SDIMAX_CONFIGS = [
    CONFIG.SDI.SINGLEx4,
    CONFIG.SDI.DUALx2,
    CONFIG.SDI.QUAD
];

// GEV configuration
export const GEV_CONFIGS = [ CONFIG.GEV.DEFAULT ];