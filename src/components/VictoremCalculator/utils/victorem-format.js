import { VIC_FORMATS } from '../constants';

export const getFormats = (model) => {
  if (model.startsWith('4B')) {
      return VIC_FORMATS.CX4B;
  } else if (model.startsWith('16B')) {
      return VIC_FORMATS.CX16B;
  } else {
      return VIC_FORMATS.CXX;
  }
};