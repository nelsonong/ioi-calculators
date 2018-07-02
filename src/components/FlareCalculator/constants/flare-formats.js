// Camera Link formats
export const FLARE_CL_FORMAT = {
    Output2x8: 'Base 8-bit x 2',
    Output3x8: 'Base 8-bit x 3',
    Output4x8: 'Medium 8-bit x 4',
    Output8x8: 'Full 8-bit x 8',
    Output10x8: '80-bit 8-bit x 10',
    Output2x10: 'Base 10-bit x 2',
    Output4x10: 'Medium 10-bit x 4',
    Output8x10: '80-bit 10-bit x 8'
};

export const FLARE_CL_DUAL_FORMAT = {
    Output16x8: 'Dual Full 8-bit x 16',
    Output16x10: 'Dual 80-bit 10-bit x 16',
    Output20x8: 'Dual 80-bit 8-bit x 20'
};

const clDualFormats = Object.values(FLARE_CL_FORMAT).concat(Object.values(FLARE_CL_DUAL_FORMAT));

export const FLARE_CL_FORMATS = {
    CL2_4m: Object.values(FLARE_CL_FORMAT),
    CL12m: clDualFormats
};

// CoaXPress formats
export const FLARE_LINK_SPEEDS = {
    CXP2: 'CXP-2',
    CXP3: 'CXP-3',
    CXP5: 'CXP-5',
    CXP6: 'CXP-6',
};

export const FLARE_CX_FORMATS = {
    CX2_4m: {
        BitDepths: [ 8, 10 ],
        LinkCounts: [ 1, 2 ],
        LinkSpeeds: [
            FLARE_LINK_SPEEDS.CXP3
        ]
    },
    CX12m: {
        BitDepths: [ 8, 10 ],
        LinkCounts: [ 1, 2, 4 ],
        LinkSpeeds: [
            FLARE_LINK_SPEEDS.CXP3,
            FLARE_LINK_SPEEDS.CXP5,
            FLARE_LINK_SPEEDS.CXP6
        ]
    },
    CX48m: {
        BitDepths: [ 8, 10, 12 ],
        LinkCounts: [ 1, 2, 4 ],
        LinkSpeeds: [
            FLARE_LINK_SPEEDS.CXP2,
            FLARE_LINK_SPEEDS.CXP3,
            FLARE_LINK_SPEEDS.CXP5,
            FLARE_LINK_SPEEDS.CXP6
        ]
    }
};

export const FLARE_SLOW_MODE_FORMATS = [
    FLARE_CL_FORMAT.Output8x8,
    FLARE_CL_FORMAT.Output8x10
];