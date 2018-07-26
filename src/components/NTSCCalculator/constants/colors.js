import { INPUT } from './inputs';

export const COLOR = {
  COLOR: '8-bit 4:2:2',
  MONOCHROME: '8-bit 4:0:0 (Monochrome | Luma only)',
};

export const INPUT_COLOR = {
  [INPUT.NTSC]: COLOR.COLOR,
  [INPUT.PAL]: COLOR.COLOR,
  [INPUT.RS170]: COLOR.MONOCHROME,
  [INPUT.CCIR]: COLOR.MONOCHROME,
};
