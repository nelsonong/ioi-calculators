export const DVR_CONFIG = {
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
    }
};

// Camera Link configurations
export const DVR_CL_CONFIGS = [
    DVR_CONFIG.CL.BASEx4,
    DVR_CONFIG.CL.FULL_BASEx2
];

export const DVR_CLPLUS_CONFIGS = Object.values(DVR_CONFIG.CL);

// CoaXPress configurations
export const DVR_CX_CONFIGS = [
    DVR_CONFIG.CX.SINGLEx4,
    DVR_CONFIG.CX.DUALx2,
    DVR_CONFIG.CX.SINGLEx2_DUAL
];

export const DVR_CXPLUS_CONFIGS = Object.values(DVR_CONFIG.CX);