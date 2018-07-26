export const LINK_SPEEDS = {
  CXP2: 'CXP-2',
  CXP3: 'CXP-3',
  CXP5: 'CXP-5',
  CXP6: 'CXP-6',
};

export const MODEL_FORMAT = {
  CX2_4m: {
    bitDepths: [8, 10],
    linkCounts: [1, 2],
    linkSpeeds: [
      LINK_SPEEDS.CXP3,
    ],
  },
  CX12m: {
    bitDepths: [8, 10],
    linkCounts: [1, 2, 4],
    linkSpeeds: [
      LINK_SPEEDS.CXP3,
      LINK_SPEEDS.CXP5,
      LINK_SPEEDS.CXP6,
    ],
  },
  CX48m: {
    bitDepths: [8, 10, 12],
    linkCounts: [1, 2, 4],
    linkSpeeds: [
      LINK_SPEEDS.CXP2,
      LINK_SPEEDS.CXP3,
      LINK_SPEEDS.CXP5,
      LINK_SPEEDS.CXP6,
    ],
  },
};
