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
  Output4x10: 'Medium 10-bit x 4',
  Output4x12: 'Medium 12-bit x 4',
  Output2x16: 'Medium 16-bit x 2',
  Output8x8: 'Full 8-bit x 8',
  Output14x4: 'Full 14-bit x 4',
  Output16x4: 'Full 16-bit x 4',
  Output10x8: '80-bit 8-bit x 10',
  Output8x10: '80-bit 10-bit x 8',
  Output16x8: 'Dual Full 8-bit x 16',
  Output16x10: 'Dual 80-bit 10-bit x 16',
  Output20x8: 'Dual 80-bit 8-bit x 20',
};

export const FORMATS = Object.values(FORMAT);

export const FORMAT_BITS = {
  [FORMAT.Output1x8]: 8,
  [FORMAT.Output2x8]: 8,
  [FORMAT.Output3x8]: 8,
  [FORMAT.Output1x10]: 10,
  [FORMAT.Output2x10]: 10,
  [FORMAT.Output1x12]: 12,
  [FORMAT.Output2x12]: 12,
  [FORMAT.Output1x14]: 14,
  [FORMAT.Output1x16]: 16,
  [FORMAT.Output1x24]: 24,
  [FORMAT.Output4x8]: 8,
  [FORMAT.Output4x10]: 10,
  [FORMAT.Output4x12]: 12,
  [FORMAT.Output2x16]: 16,
  [FORMAT.Output8x8]: 8,
  [FORMAT.Output14x4]: 14,
  [FORMAT.Output16x4]: 16,
  [FORMAT.Output10x8]: 8,
  [FORMAT.Output8x10]: 10,
  [FORMAT.Output16x8]: 8,
  [FORMAT.Output16x10]: 10,
  [FORMAT.Output20x8]: 8,
};
