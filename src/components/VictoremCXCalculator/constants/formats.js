export const FORMAT = {
  CXP2x1: '1 x CXP2',
  CXP3x1: '1 x CXP3',
  CXP5x1: '1 x CXP5',
  CXP6x1: '1 x CXP6',
  CXP2x2: '2 x CXP2',
  CXP3x2: '2 x CXP3',
  CXP5x2: '2 x CXP5',
  CXP6x2: '2 x CXP6',
};

export const FORMATS = {
  CX4B: [
    FORMAT.CXP3x1,
    FORMAT.CXP2x1,
  ],
  CX16B: [
    FORMAT.CXP5x1,
    FORMAT.CXP3x1,
    FORMAT.CXP2x1,
  ],
  CX24A: [
    FORMAT.CXP3x2,
    FORMAT.CXP2x2,
    FORMAT.CXP6x1,
    FORMAT.CXP5x1,
    FORMAT.CXP3x1,
    FORMAT.CXP2x1,
  ],
  CXX: [
    FORMAT.CXP6x2,
    FORMAT.CXP5x2,
    FORMAT.CXP3x2,
    FORMAT.CXP2x2,
    FORMAT.CXP6x1,
    FORMAT.CXP5x1,
    FORMAT.CXP3x1,
    FORMAT.CXP2x1,
  ],
};
