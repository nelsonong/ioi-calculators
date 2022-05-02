import { MODEL } from './models';

export const SENSOR = {
  AMS: 'AMS CMV12000',
  Onsemi: 'Onsemi XGS45000',
  Gpixel: 'Gpixel GMAX3265',
};

export const SENSORS = {
  [MODEL.Type120C335MCX]: SENSOR.AMS,
  [MODEL.Type120C335CCX]: SENSOR.AMS,
  [MODEL.Type447X52MCX]: SENSOR.Onsemi,
  [MODEL.Type447X52CCX]: SENSOR.Onsemi,
  [MODEL.Type654G71MCX]: SENSOR.Gpixel,
  [MODEL.Type654G71CCX]: SENSOR.Gpixel,
};
