export const FORMAT = {
    Output1x8: 'Base 8-bit x 1',
    Output2x8: 'Base 8-bit x 2',
    Output3x8: 'Base 8-bit x 3',
    Output1x10: 'Base 10-bit x 1',
    Output2x10: 'Base 10-bit x 2',
    Output1x12: 'Base 12-bit x 1',
    Output2x12: 'Base 12-bit x 2',
    Output1x14: 'Base 14-bit x 1',
    Output1x16: 'Base 16-bit x 1',
    Output1x24: 'Base 24-bit x 1',
    Output4x8: 'Medium 8-bit x 4',
    Output8x8: 'Full 8-bit x 8',
    Output10x8: '80-bit 8-bit x 10',
    Output4x10: 'Medium 10-bit x 4',
    Output8x10: '80-bit 10-bit x 8',
    Output16x8: 'Dual Full 8-bit x 16',
    Output16x10: 'Dual 80-bit 10-bit x 16',
    Output20x8: 'Dual 80-bit 8-bit x 20'
};

export const FORMATS = Object.values(FORMAT);

export const FORMAT_BITS = {
    [FORMAT.Output1x8]: 8,
    [FORMAT.Output2x8]: 16,
    [FORMAT.Output3x8]: 24,
    [FORMAT.Output1x10]: 10,
    [FORMAT.Output2x10]: 20,
    [FORMAT.Output1x12]: 12,
    [FORMAT.Output2x12]: 24,
    [FORMAT.Output1x14]: 14,
    [FORMAT.Output1x16]: 16,
    [FORMAT.Output1x24]: 24,
    [FORMAT.Output4x8]: 32,
    [FORMAT.Output8x8]: 64,
    [FORMAT.Output10x8]: 80,
    [FORMAT.Output4x10]: 40,
    [FORMAT.Output8x10]: 80,
    [FORMAT.Output16x8]: 128,
    [FORMAT.Output16x10]: 160,
    [FORMAT.Output20x8]: 160
};