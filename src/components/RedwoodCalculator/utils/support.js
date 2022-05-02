import { MODELS } from '../constants';

const isGpixel = model => MODELS.TYPE_3265.includes(model);
const isONSC = model => MODELS.TYPE_45000.includes(model);
const isAMS = model => MODELS.TYPE_12000.includes(model);

export default ({ model }) => {
  const adcBitDepths = [];

  if (isAMS(model)) {
    adcBitDepths.push(8);
  }

  if (isGpixel(model) || isONSC(model) || isAMS(model)) {
    adcBitDepths.push(10);
    adcBitDepths.push(12);
  }

  return adcBitDepths;
};
