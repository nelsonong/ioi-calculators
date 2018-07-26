export const LINK_SPEEDS = {
  CXP2: 'CXP-2',
  CXP3: 'CXP-3',
  CXP5: 'CXP-5',
  CXP6: 'CXP-6',
};

export const FORMATS = {
  CX2_4m: {
    BitDepths: [8, 10],
    LinkCounts: [1, 2],
    LinkSpeeds: [
      LINK_SPEEDS.CXP3,
    ],
  },
  CX12m: {
    BitDepths: [8, 10],
    LinkCounts: [1, 2, 4],
    LinkSpeeds: [
      LINK_SPEEDS.CXP3,
      LINK_SPEEDS.CXP5,
      LINK_SPEEDS.CXP6,
    ],
  },
  CX48m: {
    BitDepths: [8, 10, 12],
    LinkCounts: [1, 2, 4],
    LinkSpeeds: [
      LINK_SPEEDS.CXP2,
      LINK_SPEEDS.CXP3,
      LINK_SPEEDS.CXP5,
      LINK_SPEEDS.CXP6,
    ],
  },
};
