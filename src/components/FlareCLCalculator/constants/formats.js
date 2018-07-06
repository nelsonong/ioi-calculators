export const FORMAT = {
    Output2x8: 'Base 8-bit x 2',
    Output3x8: 'Base 8-bit x 3',
    Output4x8: 'Medium 8-bit x 4',
    Output8x8: 'Full 8-bit x 8',
    Output10x8: '80-bit 8-bit x 10',
    Output2x10: 'Base 10-bit x 2',
    Output4x10: 'Medium 10-bit x 4',
    Output8x10: '80-bit 10-bit x 8'
};

export const DUAL_FORMATS = {
    Output16x8: 'Dual Full 8-bit x 16',
    Output16x10: 'Dual 80-bit 10-bit x 16',
    Output20x8: 'Dual 80-bit 8-bit x 20'
};

const dualFormats = Object.values(FORMAT).concat(Object.values(DUAL_FORMATS));

export const FORMATS = {
    CL2_4m: Object.values(FORMAT),
    CL12m: dualFormats
};

export const SLOW_MODE_FORMATS = [
    FORMAT.Output8x8,
    FORMAT.Output8x10
];