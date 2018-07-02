export const VIC_FORMAT = {
    CXP2x1: '1 x CXP2',
    CXP3x1: '1 x CXP3',
    CXP5x1: '1 x CXP5',
    CXP6x1: '1 x CXP6',
    CXP2x2: '2 x CXP2',
    CXP3x2: '2 x CXP3',
    CXP5x2: '2 x CXP5',
    CXP6x2: '2 x CXP6',
};

export const VIC_FORMATS = {
    CX4B: [
        VIC_FORMAT.CXP2x1,
        VIC_FORMAT.CXP3x1
    ],
    CX16B: [
        VIC_FORMAT.CXP2x1,
        VIC_FORMAT.CXP3x1,
        VIC_FORMAT.CXP5x1
    ],
    CXX: [
        VIC_FORMAT.CXP2x1,
        VIC_FORMAT.CXP3x1,
        VIC_FORMAT.CXP5x1,
        VIC_FORMAT.CXP6x1,
        VIC_FORMAT.CXP2x2,
        VIC_FORMAT.CXP3x2,
        VIC_FORMAT.CXP5x2,
        VIC_FORMAT.CXP6x2
    ]
};

export const VIC_BIT_DEPTHS = [ 8, 10, 12 ];