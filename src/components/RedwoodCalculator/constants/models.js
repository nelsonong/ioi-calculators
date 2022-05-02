export const MODEL = {
  Type447X52CCX: '447X52MCX/Q',
  Type447X52MCX: '447X52CCX/Q',
  Type654G71MCX: '654G71MCX/Q',
  Type654G71CCX: '654G71CCX/Q',
  Type120C335MCX: '120C335MCX/Q',
  Type120C335CCX: '120C335CCX/Q',
};

export const MODELS = {
  ALL: Object.values(MODEL),
  TYPE_12000: [
    MODEL.Type120C335MCX,
    MODEL.Type120C335CCX,
  ],
  TYPE_45000: [
    MODEL.Type447X52MCX,
    MODEL.Type447X52CCX,
  ],
  TYPE_3265: [
    MODEL.Type654G71MCX,
    MODEL.Type654G71CCX,
  ],
  TYPE_MONO: [
    MODEL.Type654G71MCX,
  ],
  TYPE_COLOR: [
    MODEL.Type654G71CCX,
  ],
};